import useAppSelector from 'hooks/useAppSelector';
import { Types } from 'mongoose';
import { useDispatch } from 'react-redux';
import authSlice from 'store/reducers/authSlice';
import { Roles } from 'types/global';

function useMainLayout() {
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.auth.user);

    function loginHandler() {
        dispatch(
            authSlice.actions.setUser({
                user: { id: '3' as unknown as Types.ObjectId, avatar: '/images/avatar.jpg', name: 'Степан Иванов', role: Roles.User },
                token: '123',
            })
        );
    }

    function logoutHandler() {
        dispatch(
            authSlice.actions.setUser({
                user: null,
                token: null,
            })
        );
    }

    return { user, loginHandler, logoutHandler };
}

export default useMainLayout;
