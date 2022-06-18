import React, {useEffect, useState} from "react";
import arrow from "./arrow.png";

export const TD = () => {
    const [text, textUpdate] = useState("")
    const [list, listUpdate] = useState([])
    const [done, doneUpdate] = useState([])
    const [Api, apiUpdate] = useState([])
    console.log(Api)
    useEffect( () => {
        console.log("first update")
        fetch(' https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then( json => {
            apiUpdate(json)
        })
    }, [] )

    useEffect( () => {
        console.log("list or done update")
    }, [list, done] )

    useEffect( () => {
        console.log("tracking list")
    }, [list] )

    useEffect( () => {
        console.log("tracking done")
    }, [done] )

    useEffect( () => {
        console.log("tracking every update")
    })

    return(
        <div style={{display: "grid", gridTemplateColumns: "300px 300px", justifyItems: "center", gap: "10px" }}>
            <div>
                <h3>TD (vdo)</h3>
                <ul>
                    {list.map(((text, index) => <li>{text} <span onClick={() => {
                        let data = [...list]
                        let move = data.splice(index, 1)
                        doneUpdate([...done, ...move])
                        listUpdate(data)
                    }}><img src={arrow} style={{width: "15px", verticalAlign: "bottom"}}/></span></li>))}
                </ul>
                <div>
                    <input type="text" value={text} onChange={(e) => textUpdate(e.target.value)}/>
                    <button onClick={() => {
                        listUpdate([...list, text])
                        textUpdate("")
                    }}>add text</button>
                </div>
            </div>
            <div>
                <h3>Done</h3>
                <ul style={{listStyle: "none"}}>
                    {done.map((text, index) => <li>{text}<span>
                        <button onClick={ () => {
                            let data1 = [...done]
                            data1.splice(index, 1)
                            doneUpdate(data1)
                        }}>delete</button>
                        <button onClick={ () => {
                            let data2 = [...done]
                            let moveBack = data2.splice(index, 1)
                            listUpdate([...list, ...moveBack])
                            doneUpdate(data2)
                        }}>back</button>
                    </span></li>)}
                </ul>
            </div>
            <div className="table">
                <table>
                    <tr>
                        <th>userId</th>
                        <th>id</th>
                        <th>title</th>
                    </tr>
                        {Api.map( obj => {
                            return (<tr>
                                <td>{obj.userId}</td>
                                <td>{obj.id}</td>
                                <td>{obj.title}</td>
                                <td>{text}</td>
                            </tr>
                        )} )}
                </table>
            </div>
        </div>
    )
}
