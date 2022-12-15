function validation(){
    this.checkEmpty=(value,spanid,message)=>{
        if(value===""){
            getEle(spanid).style.display="block";
            getEle(spanid).innerHTML=message;
            return false;
        }
        else{
            getEle(spanid).style.display="none";
            getEle(spanid).innerHTML="";
            return true;
        }
    }
}