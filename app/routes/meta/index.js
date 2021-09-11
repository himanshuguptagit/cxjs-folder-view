import { Route } from 'cx/widgets';

import OpenSourceSoftware from './open-source-software';
import Folders from './folders';

export default <cx>
    <Route route="~/meta/open-source-software" url:bind="url" items={OpenSourceSoftware}/>
    <Route route="~/meta/folders" url:bind="url" items={Folders}/>
</cx>;
