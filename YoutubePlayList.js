const puppeteer = require('puppeteer');
const pdf = require('pdfkit')
const fs = require('fs')
let page ;
const link = "https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq";

(async function(){
    try{
        let browserOpen = puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:['--start-maximzed']
        })
    
        let browserInstance  = await browserOpen
        let alltabs = await browserInstance.pages();
        page = alltabs[0];
        await page.goto(link)
        await page.waitForSelector('#title .style-scope.ytd-playlist-sidebar-primary-info-renderer',visible='true')
        const playlistName = await  page.evaluate(function(select){
            return document.querySelector(select).innerText
        },'#title .style-scope.ytd-playlist-sidebar-primary-info-renderer')
        console.log(playlistName)

        // await page.waitForSelector('#stats.style-scope',visisble='true')
        const playListStats = await page.evaluate(getdata,'#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer')
        console.log(playListStats.noOfVideos , playListStats.noOfViews)
        const totalVideos = playListStats.noOfVideos.split(' ')[0];
        console.log(totalVideos)

        let currentVideos = await currentVideosLength();
        console.log(currentVideos)


        while(totalVideos-currentVideos>20){
            await scrollToBottom()
            currentVideos = await currentVideosLength()
         
        }

        const allVideosList = await getVideosInfo();
        let pdfDoc =  new pdf
        pdfDoc.pipe(fs.createWriteStream('playList.pdf'));
        pdfDoc.text(JSON.stringify(allVideosList));
        pdfDoc.end();



    }
    catch(error){
        console.log(error)
    }


})()

function getdata(selector){
    let allElements = document.querySelectorAll(selector)
    let noOfVideos = allElements[0].innerText;
    let noOfViews = allElements[1].innerText;
    return {
        noOfVideos,
        noOfViews
    }
}


async function currentVideosLength(){
    let length = await page.evaluate(getLength,'span#text')
    return length
}

function getLength(durationSelect){
    let durationElem = document.querySelectorAll(durationSelect)
    return durationElem.length
}


async function scrollToBottom(){
    return await page.evaluate(gotoBottom)

    function gotoBottom(){
        window.scrollBy(0,window.innerHeight)
    }
}


async function getVideosInfo(){
    console.log("Here")
    let list = await page.evaluate(getTitleAndDuration,'#video-title.style-scope.ytd-playlist-video-renderer','span#text');
    return list
}

function getTitleAndDuration(titleSelector,durationSelector){
    
    const videoTitle = document.querySelectorAll(titleSelector);
    const videoDuration = document.querySelectorAll(durationSelector);
  
    let videoList = [];
    for(let i=0;i<videoDuration.length;i++){
        let title = videoTitle[i].innerText;
        let duration = videoDuration[i].innerText;
        videoList.push({
            title,
            duration
        })
    }
   
    return videoList;

}