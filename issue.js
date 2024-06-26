const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const pdfkit=require("pdfkit");
function getIssuesPageHtml(url,topic,repoName){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else if(response.statusCode==404){
            console.log("page not found");
        }else{
            getIssues(html);
        }
    }
    function getIssues(html){
        let $=cheerio.load(html);
        let issuesElemArr=$("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr=[];
        //console.log(issuesElemArr.length);
        for(let i=0;i<issuesElemArr.length;i++){
            let link=$(issuesElemArr[i]).attr("href");
            arr.push(link);
        }
        //console.log(topic,":",arr);
        let folderpath=path.join(__dirname,topic);
        dirCreator(folderpath);
        let filepath=path.join(folderpath,repoName+".pdf");
        let text=JSON.stringify(arr)
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filepath));
        pdfDoc.text(text);
        pdfDoc.end();
        //fs.writeFileSync(filepath,);
        
    }
}
module.exports=getIssuesPageHtml;
function dirCreator(folderpath){
    if(fs.existsSync(folderpath)==false){
        fs.mkdirSync(folderpath);
    }
}