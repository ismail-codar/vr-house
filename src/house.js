// https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_obj_mtl.html

import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { renderer, scene, camera, rafCallbacks } from "./lib/scene.js";
import * as THREE from "three";

init();

function init() {
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.8);
  camera.add(pointLight);

  // model

  const onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(Math.round(percentComplete, 2) + "% downloaded");
    }
  };

  const onError = function () {};

  const manager = new THREE.LoadingManager();
  manager.addHandler(/\.dds$/i, new DDSLoader());

  // comment in the following line and import TGALoader if your asset uses TGA textures
  // manager.addHandler( /\.tga$/i, new TGALoader() );

  new MTLLoader(manager)
    .setPath("models/obj/male02/")
    .load("male02_dds.mtl", function (materials) {
      materials.preload();

      new OBJLoader(manager)
        .setMaterials(materials)
        .setPath("models/obj/male02/")
        .load(
          "male02.obj",
          function (object) {
            // object.position.y = 95;
            object.scale.set(0.01, 0.01, 0.01);
            scene.add(object);
          },
          onProgress,
          onError
        );
    });
}
