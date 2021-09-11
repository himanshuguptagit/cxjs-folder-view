import {Resource} from 'app/util/Resource';
import casual from 'app/util/casual';

import folderData from 'app/util/folderData.json';

export const contacts = new Resource(contactData);

contacts.filter = (data, f) => {
    if (!f)
        return data;
    var result = data;
    if (f.query) {
        var checks = f.query.split(' ').map(w=>new RegExp(w, 'gi'));
        result = result.filter(a=>checks.every(ex=>a.firstName.match(ex) || a.lastName.match(ex)));
    }
    return result;
};
