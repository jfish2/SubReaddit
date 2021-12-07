import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

function Subreaddit() {
    const [posts, setPosts] = React.useState([]);
    const [subredditFromNewPost, setSubreddit] = React.useState("");
    const nameOfSubreddit = 'python';
    React.useEffect(() => {
        axios.get("https://www.reddit.com/r/"+nameOfSubreddit +".json")
            .then(res => {
                const newPosts = res.data.data.children
                    .map(obj => obj.data);
                const subredditFromNewPost = newPosts[0];


                setPosts(newPosts);
                setSubreddit(subredditFromNewPost['subreddit_name_prefixed'])
            });
    }, []);
    return (

        <div>
                <h1>{subredditFromNewPost}</h1>

            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title} | <em> {post.num_comments === 1 ? '1 comment' : post.num_comments + ' comments'}</em></li>
                ))}
            </ul>
        </div>
    )
}

ReactDOM.render(<Subreaddit />,  document.getElementById('root'));