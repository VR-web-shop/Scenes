import ElasticService from '../../src/services/ElasticService.js';
import ModelQueryService from '../../src/services/ModelQueryService.js';

import MaterialReadCollectionQuery from '../../src/queries/Material/ReadCollectionQuery.js';
import MaterialTextureReadCollectionQuery from '../../src/queries/MaterialTexture/ReadCollectionQuery.js';
import MeshReadCollectionQuery from '../../src/queries/Mesh/ReadCollectionQuery.js';
import MeshMaterialReadCollectionQuery from '../../src/queries/MeshMaterial/ReadCollectionQuery.js';
import ProductReadCollectionQuery from '../../src/queries/Product/ReadCollectionQuery.js';
import ProductEntityReadCollectionQuery from '../../src/queries/ProductEntity/ReadCollectionQuery.js';
import ProductEntityStateReadCollectionQuery from '../../src/queries/ProductEntityState/ReadCollectionQuery.js';
import SceneReadCollectionQuery from '../../src/queries/Scene/ReadCollectionQuery.js';
import SceneBackgroundReadCollectionQuery from '../../src/queries/SceneBackground/ReadCollectionQuery.js';
import SceneBasketReadCollectionQuery from '../../src/queries/SceneBasket/ReadCollectionQuery.js';
import SceneBasketStateReadCollectionQuery from '../../src/queries/SceneBasketState/ReadCollectionQuery.js';
import SceneCameraReadCollectionQuery from '../../src/queries/SceneCamera/ReadCollectionQuery.js';
import SceneCharacterReadCollectionQuery from '../../src/queries/SceneCharacter/ReadCollectionQuery.js';
import SceneCheckoutReadCollectionQuery from '../../src/queries/SceneCheckout/ReadCollectionQuery.js';
import SceneFloorReadCollectionQuery from '../../src/queries/SceneFloor/ReadCollectionQuery.js';
import SceneLightReadCollectionQuery from '../../src/queries/SceneLight/ReadCollectionQuery.js';
import SceneLightTypeReadCollectionQuery from '../../src/queries/SceneLightType/ReadCollectionQuery.js';
import SceneProductReadCollectionQuery from '../../src/queries/SceneProduct/ReadCollectionQuery.js';
import SceneProductStateReadCollectionQuery from '../../src/queries/SceneProductState/ReadCollectionQuery.js';
import SceneStaticObjectReadCollectionQuery from '../../src/queries/SceneStaticObject/ReadCollectionQuery.js';
import TextureReadCollectionQuery from '../../src/queries/Texture/ReadCollectionQuery.js';
import TextureTypeReadCollectionQuery from '../../src/queries/TextureType/ReadCollectionQuery.js';
import Vector3dReadCollectionQuery from '../../src/queries/Vector3d/ReadCollectionQuery.js';

const up = async () => {
    const modelQueryService = new ModelQueryService();
    const readAndInsert = async (index, command, page=1) => {
        const startTime = new Date().getTime();
        console.log(`${startTime}: Reading and inserting ${index} page ${page}`);
        
        const { rows, pages } = await modelQueryService.invoke(
            new command({ limit: 100, page })
        );

        for (const row of rows) {
            await ElasticService.put(index, row.client_side_uuid, row);
        }

        if (page < pages) {
            await readAndInsert(index, command, page + 1);
        }

        const endTime = new Date().getTime();
        const seconds = (endTime - startTime) / 1000;
        console.log(`${endTime}: Finished reading and inserting ${index} page ${page} in ${seconds} seconds`);
    };

    await readAndInsert('material', MaterialReadCollectionQuery);
    await readAndInsert('materialtexture', MaterialTextureReadCollectionQuery);
    await readAndInsert('mesh', MeshReadCollectionQuery);
    await readAndInsert('meshmaterial', MeshMaterialReadCollectionQuery);
    await readAndInsert('product', ProductReadCollectionQuery);
    await readAndInsert('productentity', ProductEntityReadCollectionQuery);
    await readAndInsert('productentitystate', ProductEntityStateReadCollectionQuery);
    await readAndInsert('scene', SceneReadCollectionQuery);
    await readAndInsert('scenebackground', SceneBackgroundReadCollectionQuery);
    await readAndInsert('scenebasket', SceneBasketReadCollectionQuery);
    await readAndInsert('scenebasketstate', SceneBasketStateReadCollectionQuery);
    await readAndInsert('scenecamera', SceneCameraReadCollectionQuery);
    await readAndInsert('scenecharacter', SceneCharacterReadCollectionQuery);
    await readAndInsert('scenecheckout', SceneCheckoutReadCollectionQuery);
    await readAndInsert('scenefloor', SceneFloorReadCollectionQuery);
    await readAndInsert('scenelight', SceneLightReadCollectionQuery);
    await readAndInsert('scenelighttype', SceneLightTypeReadCollectionQuery);
    await readAndInsert('sceneproduct', SceneProductReadCollectionQuery);
    await readAndInsert('sceneproductstate', SceneProductStateReadCollectionQuery);
    await readAndInsert('scenestaticobject', SceneStaticObjectReadCollectionQuery);
    await readAndInsert('texture', TextureReadCollectionQuery);
    await readAndInsert('texturetype', TextureTypeReadCollectionQuery);
    await readAndInsert('vector3d', Vector3dReadCollectionQuery);
};

const down = async () => {
    const modelQueryService = new ModelQueryService();
    const readAndRemove = async (index, command, page=1) => {
        const startTime = new Date().getTime();
        console.log(`${startTime}: Reading and inserting ${index} page ${page}`);
        
        const { rows, pages } = await modelQueryService.invoke(
            new command({ limit: 100, page })
        );

        for (const row of rows) {
            await ElasticService.remove(index, row.client_side_uuid);
        }

        if (page < pages) {
            await readAndInsert(index, command, page + 1);
        }

        const endTime = new Date().getTime();
        const seconds = (endTime - startTime) / 1000;
        console.log(`${endTime}: Finished reading and inserting ${index} page ${page} in ${seconds} seconds`);
    };

    await readAndRemove('material', MaterialReadCollectionQuery);
    await readAndRemove('materialtexture', MaterialTextureReadCollectionQuery);
    await readAndRemove('mesh', MeshReadCollectionQuery);
    await readAndRemove('meshmaterial', MeshMaterialReadCollectionQuery);
    await readAndRemove('product', ProductReadCollectionQuery);
    await readAndRemove('productentity', ProductEntityReadCollectionQuery);
    await readAndRemove('productentitystate', ProductEntityStateReadCollectionQuery);
    await readAndRemove('scene', SceneReadCollectionQuery);
    await readAndRemove('scenebackground', SceneBackgroundReadCollectionQuery);
    await readAndRemove('scenebasket', SceneBasketReadCollectionQuery);
    await readAndRemove('scenebasketstate', SceneBasketStateReadCollectionQuery);
    await readAndRemove('scenecamera', SceneCameraReadCollectionQuery);
    await readAndRemove('scenecharacter', SceneCharacterReadCollectionQuery);
    await readAndRemove('scenecheckout', SceneCheckoutReadCollectionQuery);
    await readAndRemove('scenefloor', SceneFloorReadCollectionQuery);
    await readAndRemove('scenelight', SceneLightReadCollectionQuery);
    await readAndRemove('scenelighttype', SceneLightTypeReadCollectionQuery);
    await readAndRemove('sceneproduct', SceneProductReadCollectionQuery);
    await readAndRemove('sceneproductstate', SceneProductStateReadCollectionQuery);
    await readAndRemove('scenestaticobject', SceneStaticObjectReadCollectionQuery);
    await readAndRemove('texture', TextureReadCollectionQuery);
    await readAndRemove('texturetype', TextureTypeReadCollectionQuery);
    await readAndRemove('vector3d', Vector3dReadCollectionQuery);
}

if (process.argv[2] === 'up') {
    up();
} else if (process.argv[2] === 'down') {
    down();
}
