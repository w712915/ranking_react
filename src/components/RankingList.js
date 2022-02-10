import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";

function getRandomNum() {
    return Math.floor(Math.random() * 1000);
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

const RankingList = (props) => {
    const [posts, setPosts] = useState(props.posts)

    // sort by score
    const sortPost = (e) => {
        e.sort((a, b) => {
            if(a.score < b.score) return 1;
            if(a.score > b.score) return -1;
            return 0;
        });
    }

    // updata posts
    const updateRanking = useCallback((index, rank, addScore) => {
        setPosts(state => ({
            ...state, [index]: {
                userID: state[index].userID,
                displayName: state[index].displayName,
                picture: state[index].picture,
                score: addScore ? (state[index].score + addScore) : state[index].score,
                rank: rank || state[index].rank
            }
        }));
        
        props.setPosts(state => ({
            ...state, [index]: {
                userID: state[index].userID,
                displayName: state[index].displayName,
                picture: state[index].picture,
                score: addScore ? (state[index].score + addScore) : state[index].score,
                rank: rank || state[index].rank
            }
        }));
    }, [props]);

    // count up score
    const countUp = useCallback((index, oldScore, newScore) => {
        const speed = 1;
        let countTime = 10
        setInterval(function(){
            if (oldScore < newScore) {
                let plusNum = Math.floor((newScore - oldScore) / countTime)
                oldScore += plusNum
                updateRanking(index, null, plusNum)
                countTime -= 1
            }
        }, speed);
    }, [updateRanking]);

    useEffect(() => {
        const updateSpeed = 1000
        const intervalId = setInterval(function () {
            const sortTarget = Object.values(posts).slice()
            sortPost(sortTarget)
            const object = Object.values(posts)
            const objectLength = object.length
            for (let i = 0; i < objectLength; i++) {
                let index = i
                let isSort = false
                let addScore = getRandomNum()
                let sortIndex = sortTarget.findIndex((item) => item.userID === object[i].userID)

                // update rank
                if (sortIndex !== i) {
                    isSort = true
                }

                // not update
                const randomIndex = getRandomIndex(objectLength)
                if (randomIndex < objectLength / 2) {
                    addScore = 0
                }

                // count up
                countUp(i, Object.values(posts)[i].score, Object.values(posts)[i].score + addScore)

                updateRanking(index, isSort ? sortIndex : i, null)
            }
        }, updateSpeed);
        return function () { clearInterval(intervalId) };
    }, [posts, countUp, updateRanking]);

    return (
        <React.Fragment>
            <Wrapper>
                {
                    Object.values(posts).map((post) =>
                        <StyleListDetail key={post.userID} rank={post.rank}>
                            <Index>{post.rank + 1}</Index>
                            <Picture picture={post.picture} />
                            <Name>{post.displayName}</Name>
                            <Score key={post.userID}>{post.score}</Score>
                        </StyleListDetail>
                    )
                }
            </Wrapper>
        </React.Fragment>
    )
}

export default RankingList

const Wrapper = styled.ul`
    margin: 0 auto;
`
const StyleListDetail = styled.li`
    width: 320px;
    height: 48px;
    position: absolute;
    top: ${props => props.rank * 48}px;
    left: 50%;
    margin-left: -160px;
    transition: all 0.3s ease 0s;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
`
const Index = styled.div`
    width: 24px;
    text-align: center;
`
const Picture = styled.div`
    background-image: url(${props => props.picture}), url(https://webcdn.17app.co/17live/ig-default.svg);
    background-size: 100%;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    border: 2px solid rgb(255, 255, 255);
`
const Name = styled.div`
`
const Score = styled.div`
    -webkit-box-flex: 1;
    flex-grow: 1;
    text-align: right;
    font-family: 'Roboto Mono', monospace;
    &:after {
        display: inline-block;
        content: "pt"
    }
`