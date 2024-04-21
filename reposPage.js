const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml = require("./issue");
function getReposPageHtml(url,topic){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else if(response.statusCode==404){
            console.log("page not found");
        }else{
            getReposLink(html);
        }
    }
    function getReposLink(html){
        let $=cheerio.load(html);
        let headingsArr=$("article.border.rounded.color-shadow-small.color-bg-subtle.my-4");
        //console.log(topic);
        for(let i=0;i<8;i++){
            let twoAnchors=$(headingsArr[i]).find("a");
            let link=$(twoAnchors[1]).attr("href");
            //console.log(link);
            let fullLink=`https://github.com${link}/issues`;
            let repoName=link.split("/").pop();
            //console.log(i+":"+repoName);
            getIssuesPageHtml(fullLink,topic,repoName); 
    
        }
        console.log("````````````````````````````````");
    }
}


module.exports = getReposPageHtml;