import { Router } from 'express';

import AdminPermissionRoutes from './admin-permission/admin-permission.routes';
import AdminRoutes from './admin/admin.routes';
import AuthRoutes from './auth/auth.routes';
import CampaignRoutes from './campaign/campaign.routes';
import CategoryRoutes from './category/category.routes';
import RegisterRoutes from './register/register.routes';
import UploadFileRoutes from './upload-file/upload-file.routes';

const router = Router();

router.use('/admins/permissions', AdminPermissionRoutes);
router.use('/admins', AdminRoutes);
router.use('/auth', AuthRoutes);
router.use('/campaigns', CampaignRoutes);
router.use('/categories', CategoryRoutes);
router.use('/registers', RegisterRoutes);
router.use('/upload-file', UploadFileRoutes);

export default router;
