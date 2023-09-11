import React, {useState} from "react";
import axios from "axios";
import {Canvas} from "@react-three/fiber";
import {ApiError, ITriangle} from "./Types";
import Cone from "./Cone";


function App() {

  const [height, setHeight] = useState<number | string>(0);
  const [radius, setRadius] = useState<number | string>(0);
  const [segments, setSegments] = useState<number | string>(0);
  const [triangulation, setTriangulation] = useState<ITriangle[] | null>(
      null
  );


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const apiTriangulationResponse = await axios.get<ITriangle[]>("http://localhost:8080/api/v1/triangulation", {
        params: {height, radius, segments}
      })
      setTriangulation(apiTriangulationResponse.data);
    } catch (error: unknown) {
      const registrationError = error as ApiError;
      alert(registrationError.response.data.message)
    }

  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
              type="number"
              placeholder="Height"
              value={height === "" ? "" : height}
              onChange={(e) => setHeight(e.target.value)}
              required
          />
          <input
              type="number"
              placeholder="Radius"
              value={radius === "" ? "" : radius}
              onChange={(e) => setRadius(e.target.value)}
              required
          />
          <input
              type="number"
              placeholder="Segments"
              value={segments === "" ? "" : segments}
              onChange={(e) => setSegments(e.target.value)}
              required
          />
          <button type="submit">Compute Triangulation</button>
        </form>

        <div style={{width: '100wv', height: '100vh'}}>
          <Canvas camera={{fov: 75, position: [0, 0, 100]}}

          >
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            {
              triangulation ?
                  <Cone data={triangulation}/> :
                  <></>
            }
          </Canvas>
        </div>

      </div>
  );
}


export default App;
