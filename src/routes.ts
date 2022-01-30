import { Router } from "express";
import PlayerController from "./app/controllers/PlayerController";
import AuthController from "./app/controllers/AuthController";
import AddressController from './app/controllers/AddressController';
import PatentController  from "./app/controllers/PatentController";
import PurchaseController from "./app/controllers/PurchaseController";
import ArtefactController from "./app/controllers/ArtefactController";
import MatchController from "./app/controllers/MatchController";
import ObjectiveController from "./app/controllers/ObjectiveController";
import RoundController from "./app/controllers/RoundController";
import ResultController from "./app/controllers/ResultController";
import MapController from "./app/controllers/MapController";
import LocalController from "./app/controllers/LocalController";
import PurchaseItemsController from "./app/controllers/PurchaseItemsController";

const router = Router();

router.post('/player/store', PlayerController.store);
router.post('/player/update', PlayerController.update);
router.post('/player/delete', PlayerController.delete);
router.post('/player/list', PlayerController.list);

router.post('/auth', AuthController.authenticate);

router.post('/address/store', AddressController.store);
router.post('/address/list', AddressController.list);
router.post('/address/delete', AddressController.delete);
router.post('/address/find', AddressController.find)

router.post('/patent/store', PatentController.store);
router.post('/patent/list', PatentController.list);

router.post('/purchase/store', PurchaseController.store);
router.post('/purchase/list', PurchaseController.list);

router.post('/artefact/store', ArtefactController.store);
router.post('/artefact/list', ArtefactController.list);
router.post('/artefact/update', ArtefactController.update);

router.post('/match/store', MatchController.store);
router.post('/match/list', MatchController.list);

router.post('/objective/store', ObjectiveController.store);
router.post('/objective/list', ObjectiveController.list);
router.post('/objective/delete', ObjectiveController.delete);
router.post('/objective/find', ObjectiveController.find);

router.post('/round/store', RoundController.store);
router.post('/round/list', RoundController.list);
router.post('/round/delete', RoundController.delete);

router.post('/result/store', ResultController.store);
router.post('/router/list', ResultController.list);

router.post('/map/store', MapController.store);
router.post('/map/list', MapController.list);

router.post('/local/store', LocalController.store);
router.post('/local/list', LocalController.list);

router.post('/purchaseitems/store', PurchaseItemsController.store);
router.post('/purchaseitems/list', PurchaseItemsController.list);

export default router;
