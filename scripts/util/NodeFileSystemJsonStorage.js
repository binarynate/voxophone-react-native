import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import uuid from 'uuid';
import { validate } from 'parameter-validator';
import ninvoke from './ninvoke';

/**
* Implements database-like, file system-based storage for JSON objects.
*/
export default class NodeFileSystemJsonStorage {

    constructor(options) {

        validate(options, [ 'directoryPath' ], this, { addPrefix: '_' });
    }

    /**
    * @returns Promise.<Object> - The inserted entity
    */
    insert(entity) {

        return Promise.resolve()
        .then(() => {

            let id = uuid.v4();
            entity = _.cloneDeep(entity);
            entity.id = id;

            let filePath = path.join(this._directoryPath, `${id}.json`);
            let serializedEntity = JSON.stringify(entity);
            return ninvoke(fs, 'writeFile', filePath, serializedEntity)
            .then(() => entity);
        });
    }
}
