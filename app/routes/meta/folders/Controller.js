import { Controller } from "cx/ui";
import casual from 'app/util/casual';
import { formatBytes } from "../../../util/formatBytes";

import foldersData from './foldersData.json';

import file_icon from './icons/file-icon.png'; 
import pdf_icon from './icons/pdf-icon.png'; 
import doc_icon from './icons/doc-icon.png'; 
import xls_icon from './icons/xls-icon.png'; 

function dfs(node, id){

    if(!node){
        return null;
    }

    if(node.id && node.id == id){
        return node;
    }

    let res = null;
    if(node.$children){
        for(let i = 0; i < node.$children.length; i++){
            res = dfs(node.$children[i], id);
            if(res != null){
                return res;
            }
        }
    }

    return null;
}

function getFileIcon(type){
    console.log(type)
    switch(type){
        case "pdf":
            return pdf_icon;
        case "doc":
        case "docx": 
            return doc_icon;
        case "xls": 
        case "xlsx": 
            return xls_icon;
        default:
            return file_icon;
    }

}

export default class PageController extends Controller {
    init() {
        super.init();
        this.idSeq = 0;
        this.store.set("data", foldersData['$children']);

        this.addTrigger('selection', ['$page.selection'], id => {
            let node = dfs(foldersData, id);
            node =this._formatNode(node);
            this.store.set('$page.selectedFolderData', node);
        }, true);
    }

    _formatNode(node){
        if(node && node.documents){
            let obj =  node.documents.map(doc => {
                console.log(doc)
                let date = new Date(doc.date_modified);
                return {
                    ...doc,
                    formattedSize: formatBytes(doc.size),
                    formattedDate: date.toDateString(),
                    icon: getFileIcon(doc.type)
                };
            })
            node.documents = obj;
        }

        return node;
    }
}


