const puppeteer = require("puppeteer");
let page;
const cheerio = require("cheerio");
const request = require("request");
const answer = [
  `#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define rep(i,a,b)        for(int i=a;i<b;i++)
 
int predict(string str, int A, int B,int turn, int i){
 //   cout<<i<<" "<<A<<" "<<B<<endl;
    if(i==10){
        return 10;
    }
    int rem = 10-i;
    int max_score = rem/2;
    if(rem%2!=0){
        max_score++;
    }
    
    if(turn%2==0){
        int achieve =A+max_score;
        if(achieve<B){
           
            return i;
        }
    }
    if(turn%2!=0){
        int achieve =B+max_score;
        if(achieve<A){
            
            return i;
        }
        
    }
    int play = i/2 + 1;
    if(turn%2==0){
        if(str[i]=='1'){
            return predict(str,A+1,B,turn^1,i+1);
        }
        else if(str[i]=='0'){
            int next = 5-play+A;
            if(next<B){
                return i+1;
            }
            return predict(str,A,B,turn^1,i+1);
        }
        else{
            int next = 5-play+A;
            if(next<B){
                return i+1;
            }
            return min(predict(str,A+1,B,turn^1,i+1),predict(str,A,B,turn^1,i+1));
        }
    }
    else{
        if(str[i]=='1'){
            
            return predict(str,A,B+1,turn^1,i+1);
        }
        else if(str[i]=='0'){
            int next = 5-play+B;
            if(next<A){
                return i+1;
            }
            return predict(str,A,B,turn^1,i+1);
        }
        else{
            int next = 5-play+B;
            if(next<A){
                return i+1;
            }
            return min(predict(str,A,B,turn^1,i+1),predict(str,A,B+1,turn^1,i+1));
        }
    }
}
 
 
int main() {
  int t;
  cin >> t;
  while (t--) {
    string str;
    cin>>str;
    int ans = predict(str,0,0,0,0);
    
    cout<<ans<<endl;
 
  }
}`,
];
const browseropen = puppeteer.launch({
  headless: false,
  defaultViewport: null,
});
browseropen
  .then(function (browser) {
    // getting all tabs open currently
    const pageArrPromise = browser.pages();
    return pageArrPromise;
  })
  .then(function (browserPages) {
    page = browserPages[0]; // geeting first tab
    // requesting puppeteer to go to the follwing web page in Browser
    const gotoPromise = page.goto("https://www.google.com/");
    return gotoPromise;
  })
  .then(function () {
    // waiting for the element to apper that is we going to select
    const elementwaitPromise = page.waitForSelector(
      'input[type="text"]',
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const keysWillbePressed = page.type(
      'input[type="text"]',
      "codeforces",
      {delay:50}
    );
    return keysWillbePressed;
  })
  .then(function () {
    const enterWillBepressed = page.keyboard.press("Enter");
    return enterWillBepressed;
  })
  .then(function () {
    // waiting for the first link to be select
    const elementwaitPromise = page.waitForSelector(
      ".tF2Cxc .yuRUbf .LC20lb.DKV0Md",
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const mousewillClick = page.click(".tF2Cxc .yuRUbf .LC20lb.DKV0Md");
    return mousewillClick;
  })
  .then(function () {
    const url = page.url();
    const gotoPromise = page.goto(url + "enter?back=%2F");
    return gotoPromise;
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      "#handleOrEmail",
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const keysWillbePressed = page.type(
      "#handleOrEmail",
      "shersin9891@gmail.com",
      {delay:50}
    );
    return keysWillbePressed;
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      "#password",
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const keysWillbePressed = page.type(
      "#password",
      "Gujjar@1999",
      {delay:50}
    );
    return keysWillbePressed;
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      'input[type="submit"]',
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const mousewillClick = page.click('input[type="submit"]');
    return mousewillClick;
  })
  .then(function () {
    return page.waitForTimeout(3000);
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      'li a[href="/problemset"]',
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const mousewillClick = page.click('li a[href="/problemset"]');
    return mousewillClick;
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      'input[name="minDifficulty"]',
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const keysWillbePressed = page.type('input[name="minDifficulty"]', "1000",{delay:10});
    return keysWillbePressed;
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      'input[name="maxDifficulty"]',
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const keysWillbePressed = page.type('input[name="maxDifficulty"]', "1200",{delay:10});
    return keysWillbePressed;
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      "._FilterByTagsFrame_addTagLink",
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    // let mousewillClick = page.click('._FilterByTagsFrame_addTagLink');
    return page.click("._FilterByTagsFrame_addTagLink");
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      "form select",
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const mousewillClick = page.select("form select", "dp");
    return mousewillClick;
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      'input[type="submit"]',
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const mousewillClick = page.click('input[type="submit"]');
    return mousewillClick;
  })
  .then(function () {
    return page.waitForTimeout(3000);
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      "table.problems tbody td.id",
      (visible = true)
    );
    return elementwaitPromise;
  })
  .then(function () {
    const mousewillClick = page.click("table.problems tbody td.id");
    return mousewillClick;
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      'li a[href="/problemset/submit"]',
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const mousewillClick = page.click('li a[href="/problemset/submit"]');
    return mousewillClick;
  })
  .then(function () {
    return page.waitForTimeout(3000);
  })
  .then(function () {
    const elementwaitPromise = page.waitForSelector(
      ".ace_scroller .ace_content",
      (visible = "true")
    );
    return elementwaitPromise;
  })
  .then(function () {
    const keysWillbePressed = page.type(".ace_scroller .ace_content", answer[0],{delay:10});
    return keysWillbePressed;
  })
  .then(function(){
    const elementwaitPromise = page.waitForSelector('input.submit',(visible="true"))
    return elementwaitPromise;
  })
  .then(function(){
    const mousewillClick = page.click('input.submit');
    return mousewillClick;
  })

  .catch(function (err) {
    console.log(err);
  });
  
