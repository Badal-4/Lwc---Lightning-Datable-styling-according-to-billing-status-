import { LightningElement, wire } from 'lwc';
import getAcc from '@salesforce/apex/lwcController.getAcc'
import COLORS from '@salesforce/resourceUrl/colors'
import {loadStyle} from 'lightning/platformResourceLoader'
const COLUMNS = [
    {label:'Account Name', fieldName:'Name',  cellAttributes:{
        class:{fieldName:'accountColor'}
    }},
    {label:'Bill Status', fieldName:'Bill_Status__c',  cellAttributes:{
        class:{fieldName:'amountColor'},
        iconName:{fieldName:'iconName'}, iconPosition:'right'
    }},
    
  
]
export default class DatatableDemo extends LightningElement {
    tableData
    columns = COLUMNS
    isCssLoaded = false

    @wire(getAcc)
    accountsHandler({data, error}){ 
        if(data){ 
            
            this.tableData = data.map(item=>{
                let amountColor = item.Bill_Status__c == 'Unpaid' ? "slds-text-color_error":"slds-text-color_success"
                let iconName = item.Bill_Status__c == 'Unpaid' ? "utility:down":"utility:up"
                return {...item, 
                    "amountColor":amountColor,
                    "iconName":iconName,
                
                }
            })
            console.log(this.tableData)
        }
        if(error){
            console.error(error)
        }
    }

    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }

}
