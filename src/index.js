import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';

function Title(props) {
    return <h1 style={ {color: 'green'} } className="Title">{props.title}</h1>
}

function App(props) {
    return (
	    <Title title={ props.post.title}/>
    );
}

ReactDOM.render(
	<App post={ {title: 'My titleys'} } />,
    document.getElementById('root')
);
