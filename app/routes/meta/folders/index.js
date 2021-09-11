import { HtmlElement, Repeater, TextField, Checkbox, Button, List, Link, Text, ValidationGroup, Grid, TreeAdapter, TreeNode, FlexRow } from 'cx/widgets';
import { LabelsTopLayout, KeySelection } from 'cx/ui';
import { Glyph } from 'app/components/Glyph';
import FolderController from './Controller';
import { applyOuterLayout } from 'app/layouts/dynamicLayout';
import { formatBytes } from '../../../util/formatBytes';
import "./index.scss";


export default <cx>
    <main class="csb-contacts">
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
                <li class="cse-breadcrumb-item">Meta</li>
                <li class="cse-breadcrumb-item">Folders</li>
            </ul>
        </div>
        <aside class="cse-contacts-list">
            <div controller={FolderController}>
                <Grid
                    records:bind="data"
                    mod="tree"
                    style={{ width: "100%" }}

                    dataAdapter={{
                        type: TreeAdapter,
                    }}

                    selection={{ type: KeySelection, bind: "$page.selection" }}
                    columns={[
                        {
                            header: "Folders",
                            field: "name",
                            sortable: true,
                            items: (
                                <cx>
                                    <TreeNode
                                        expanded:bind="$record.$expanded"
                                        leaf:bind="$record.$leaf"
                                        level:bind="$record.$level"
                                        loading:bind="$record.$loading"
                                        text:bind="$record.name"
                                    />
                                </cx>
                            )
                        }
                    ]}
                />
            </div>

        </aside>

        <article class="cse-contacts-details">
            <div class="cse-contacts-toolbar">
                <h2 text:tpl="{$page.selectedFolderData.name}" />
                <div class="flex1" />
                <Glyph visible:expr="{$page.loading}" name="refresh" style="margin:5px" />
            </div>
            <div class="">
                {/* <List records:bind="$page.selectedFolderData.documents"
                      class="flex-1">

                    <div class="gh-repo">
                        <img src:bind='$record.owner.avatar_url'
                             alt="avatar"/>
                        <div class="description">
                            <h4 text:bind="$record.name"></h4>
                            <div innerHtml:tpl="{$record.type}"></div>
                        </div>
                    </div>
                </List> */}
                    <FlexRow spacing wrap class="presentation" >
                        <Repeater records:bind="$page.selectedFolderData.documents">
                            {/* <div style={`width: 30px; height: 30px; background: ${boxColor}`} /> */}
                            <div class="gh-repo">
                                <img src:bind="$record.icon"
                                    alt="avatar"/>
                                <div class="description">

                                    <h4 text:bind="$record.name"></h4>
                                    {/* <div innerHtml:tpl="{$record.type}"></div> */}
                                    <FlexRow spacing justify="space" class="presentation">
                                    <div innerHtml:tpl="{$record.type}" />
                                    <div innerHtml:tpl="{$record.formattedSize}" />
                                    <div innerHtml:tpl="{$record.formattedDate}" />
                                </FlexRow>
                                </div>
                            </div>
                        </Repeater>
                    </FlexRow>
            </div>
        </article>
    </main>
</cx>;

