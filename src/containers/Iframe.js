import React, { useEffect, useRef } from 'react';

export default function Iframe(props) {
    const iframe = useRef();

    useEffect(() => {
        updateIframe();
    });
    
    const updateIframe = () => {
        const document = iframe.current.contentDocument;
        document.body.innerHTML = props.content;
        console.log(props.content);
    }

    return (
        <iframe
            title="test"
            ref={iframe}
        ></iframe>
    );
}