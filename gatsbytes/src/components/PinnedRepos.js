import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as styles from './pinnedrepos.module.css';


const PinnedRepos = () => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetchPinnedRepos().then(setRepos);
    }, []);

    async function fetchPinnedRepos() {
        const query = `
      query {
        viewer {
          pinnedItems(first: 6, types: [REPOSITORY]) {
            nodes {
              ... on Repository {
                id
                name
                url
                description
                stargazerCount
                forkCount
              }
            }
          }
        }
      }`;

        const url = 'https://api.github.com/graphql';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GATSBY_GITHUB_TOKEN}`,
        };


        try {
            const result = await axios({
                url,
                method: 'post',
                headers,
                data: {
                    query,
                },
            });

            return result.data.data.viewer.pinnedItems.nodes;

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <h2>Pinned Repositories</h2>
            {repos && repos.length > 0 && repos.map((repo) => (
                <div key={repo.id} className={styles.repoCard}>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                    </a>
                    <p>{repo.description}</p>
                    <p>Stars: {repo.stargazerCount} | Forks: {repo.forkCount}</p>
                </div>
            ))}
        </div>
    );
}

console.log('Github Token:', process.env.GATSBY_GITHUB_TOKEN);


export default PinnedRepos;
