//imports the useful stuff
import fs from 'fs';
import path from 'path';

//finds the data sub directory
const dataDir = path.join(process.cwd(), 'data');


//gets all of the post data from a particular post
export function getSortedPostsData() {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);
    jsonObj.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });

    //returns the title and date of a particular post
    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            title: item.title,
            date: item.date
        }
    });
}

//function to get specifically the post IDs. 
// most of it is very similar to the above function
export function getAllPostIds() {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);
    console.log(jsonObj);
    return jsonObj.map(item => {
        return {
          params: {
            id: item.id.toString()
          }
        }
      });
}
//returns the post with the specified ID
//must recieve the id parameter
export function getPostData(id) {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);
    const objReturn = jsonObj.filter(obj => {
        return obj.id.toString() === id;
    });

    //checks to see if the post ID is valid
    if (objReturn.length === 0) {
        return {
            id: id,
            title: 'Nothing Found',
            date: '',
            contentHtml: 'Hey Jimmy, gimmie a page with nuthin.'
        }
    } else {
        return objReturn[0];
    }


}