import { ReactNode } from 'react';
import AdminLayout from './AdminLayout';
import MainLayout from './MainLayout';

export function getAdminLayout(page: ReactNode) {
    return (
        <MainLayout title="Админка" showFooter={false}>
            <AdminLayout>{page}</AdminLayout>
        </MainLayout>
    );
}

export function getDefaultLayout(title?: string) {
    return function getLayout(page: ReactNode) {
        return <MainLayout title={title}>{page}</MainLayout>;
    };
}
