
import { useRef, useState } from 'react';
import './App.css';
import { useMediaDevices } from 'react-use';
import SimplePeer from 'simple-peer';

const App = () =>{
 
  const [peers, setPeers] = useState([])
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const {microphone} = useMediaDevices();


  const startStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setStream(stream);
    localVideoRef.current.srcObject = stream;
  };

  const createPeer = () => {
    const peer = new SimplePeer({ initiator: true, stream });
    peer.on('signal', (data) => {
      console.log('Received signal:', data);
    });
    peer.on('stream', stream => {
      setRemoteStream(stream);
      remoteVideoRef.current.srcObject = stream;
    })
    setPeers(peer)
  }



  
  return (
    <div>
      <button onClick={startStream}>Start Stream</button> 
      <button onClick={createPeer}>Create Peer</button> 
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
    </div>
  );
}

export default App;
