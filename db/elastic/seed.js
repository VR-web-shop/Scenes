import ElasticService from '../../src/services/ElasticService.js';
import ModelQueryService from '../../src/services/ModelQueryService.js';

import Material from '../../src/modelDefinitions/Material.js';
import MaterialType from '../../src/modelDefinitions/MaterialType.js';
import MaterialTexture from '../../src/modelDefinitions/MaterialTexture.js';
import Mesh from '../../src/modelDefinitions/Mesh.js';
import MeshMaterial from '../../src/modelDefinitions/MeshMaterial.js';
import Product from '../../src/modelDefinitions/Product.js';
import ProductEntity from '../../src/modelDefinitions/ProductEntity.js';
import ProductEntityState from '../../src/modelDefinitions/ProductEntityState.js';
import Scene from '../../src/modelDefinitions/Scene.js';
import SceneBackground from '../../src/modelDefinitions/SceneBackground.js';
import SceneBasket from '../../src/modelDefinitions/SceneBasket.js';
import SceneBasketState from '../../src/modelDefinitions/SceneBasketState.js';
import SceneCamera from '../../src/modelDefinitions/SceneCamera.js';
import SceneCharacter from '../../src/modelDefinitions/SceneCharacter.js';
import SceneCheckout from '../../src/modelDefinitions/SceneCheckout.js';
import SceneFloor from '../../src/modelDefinitions/SceneFloor.js';
import SceneLight from '../../src/modelDefinitions/SceneLight.js';
import SceneLightType from '../../src/modelDefinitions/SceneLightType.js';
import SceneProduct from '../../src/modelDefinitions/SceneProduct.js';
import SceneProductState from '../../src/modelDefinitions/SceneProductState.js';
import SceneStaticObject from '../../src/modelDefinitions/SceneStaticObject.js';
import Texture from '../../src/modelDefinitions/Texture.js';
import TextureType from '../../src/modelDefinitions/TextureType.js';
import Vector3d from '../../src/modelDefinitions/Vector3D.js';

import MaterialTypeReadCollectionQuery from '../../src/queries/MaterialType/ReadCollectionQuery.js';
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
import Vector3dReadCollectionQuery from '../../src/queries/Vector3D/ReadCollectionQuery.js';

const up = async () => {
    const modelQueryService = new ModelQueryService();
    const readAndInsert = async (definition, command, page=1) => {
        if (!definition.elastic) return;
        const { rows, pages } = await modelQueryService.invoke(
            new command({ limit: 1000, page })
        );

        const time = {
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }

        const { elastic, pkName } = definition;

        for (const row of rows) {
            const pk = row[pkName];
            await ElasticService.putFromConfig(elastic, pkName, pk, { 
                [pkName]: pk,...row, ...time,
            });
        }
    
        if (page < pages) {
            await readAndInsert(definition, command, page + 1);
        }
    };

    const startTime = new Date().getTime();
    console.log(`${startTime}: Starting reading and inserting`);
    await readAndInsert(Material, MaterialReadCollectionQuery);
    await readAndInsert(MaterialType, MaterialTypeReadCollectionQuery);
    await readAndInsert(MaterialTexture, MaterialTextureReadCollectionQuery);
    await readAndInsert(Mesh, MeshReadCollectionQuery);
    await readAndInsert(MeshMaterial, MeshMaterialReadCollectionQuery);
    await readAndInsert(Product, ProductReadCollectionQuery);
    await readAndInsert(ProductEntity, ProductEntityReadCollectionQuery);
    await readAndInsert(ProductEntityState, ProductEntityStateReadCollectionQuery);
    await readAndInsert(Scene, SceneReadCollectionQuery);
    await readAndInsert(SceneBackground, SceneBackgroundReadCollectionQuery);
    await readAndInsert(SceneBasket, SceneBasketReadCollectionQuery);
    await readAndInsert(SceneBasketState, SceneBasketStateReadCollectionQuery);
    await readAndInsert(SceneCamera, SceneCameraReadCollectionQuery);
    await readAndInsert(SceneCharacter, SceneCharacterReadCollectionQuery);
    await readAndInsert(SceneCheckout, SceneCheckoutReadCollectionQuery);
    await readAndInsert(SceneFloor, SceneFloorReadCollectionQuery);
    await readAndInsert(SceneLight, SceneLightReadCollectionQuery);
    await readAndInsert(SceneLightType, SceneLightTypeReadCollectionQuery);
    await readAndInsert(SceneProduct, SceneProductReadCollectionQuery);
    await readAndInsert(SceneProductState, SceneProductStateReadCollectionQuery);
    await readAndInsert(SceneStaticObject, SceneStaticObjectReadCollectionQuery);
    await readAndInsert(Texture, TextureReadCollectionQuery);
    await readAndInsert(TextureType, TextureTypeReadCollectionQuery);
    await readAndInsert(Vector3d, Vector3dReadCollectionQuery);
    const endTime = new Date().getTime();
    const seconds = (endTime - startTime) / 1000;
    console.log(`${endTime}: Finished reading and inserting in ${seconds} seconds`);
};

const down = async () => {
    const removeIndex = async (index,) => {
        if (await ElasticService.indiciesExist(index)) {
            await ElasticService.deleteIndex(index);
        }
    };

    const startTime = new Date().getTime();
    console.log(`${startTime}: Start removing`);
    await removeIndex('material');
    await removeIndex('materialtype');
    await removeIndex('materialtexture');
    await removeIndex('mesh');
    await removeIndex('meshmaterial');
    await removeIndex('product');
    await removeIndex('productentity');
    await removeIndex('productentitystate');
    await removeIndex('scene');
    await removeIndex('scenebackground');
    await removeIndex('scenebasket');
    await removeIndex('scenebasketstate');
    await removeIndex('scenecamera');
    await removeIndex('scenecharacter');
    await removeIndex('scenecheckout');
    await removeIndex('scenefloor');
    await removeIndex('scenelight');
    await removeIndex('scenelighttype');
    await removeIndex('sceneproduct');
    await removeIndex('sceneproductstate');
    await removeIndex('scenestaticobject');
    await removeIndex('texture');
    await removeIndex('texturetype');
    await removeIndex('vector3d');
    const endTime = new Date().getTime();
    const seconds = (endTime - startTime) / 1000;
    console.log(`${endTime}: Finished removing in ${seconds} seconds`);
}

if (process.argv[2] === 'up') {
    up();
} else if (process.argv[2] === 'down') {
    down();
}
