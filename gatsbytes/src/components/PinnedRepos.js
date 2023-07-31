import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as styles from './pinnedrepos.module.css';
import { AiOutlineStar, AiOutlineFork, AiFillBook } from 'react-icons/ai';

const languageColors = {
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    "Jupyter Notebook": "#DA5B0B",
    HCL: "#844FBA",
    // Add more language-color pairs
};

const truncateDescription = (description, maxLength) => {
    if (!description) return '';
    if (description.length <= maxLength) {
        return description;
    }

    return `${description.substring(0, maxLength)}...`;
}

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
                primaryLanguage {
                    name
                }
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
            {repos && repos.length > 0 && <h2>Repos</h2>}
            {repos && repos.length > 0 && repos.map((repo) => (
                <div key={repo.id} className={styles.repoCard}>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        <AiFillBook className={styles.icon}/> {repo.name}
                    </a>
                    <p className={styles.repoDescription}>{truncateDescription(repo.description, 90)}</p>
                    <div className={styles.repoStats}>
                        <span 
                            className={styles.languageBubble} 
                            style={{ backgroundColor: languageColors[repo.primaryLanguage.name] }}
                        ></span>
                        {repo.primaryLanguage.name} 
                        <AiOutlineStar className={styles.icon}/> {repo.stargazerCount} 
                        <AiOutlineFork className={styles.icon}/> {repo.forkCount}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PinnedRepos;
