'use client';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import testSlice from 'store/reducers/testSlide';

function Home() {
    const dispatch = useAppDispatch();
    const counterValue = useAppSelector((state) => state.test.value);

    return (
        <div style={{ fontSize: 24 }}>
            <p>Counter</p>
            <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ padding: 10, fontSize: 16 }} onClick={() => dispatch(testSlice.actions.increment())}>
                    +
                </button>
                <span>{counterValue}</span>
                <button style={{ padding: 10, fontSize: 16 }} onClick={() => dispatch(testSlice.actions.decrement())}>
                    -
                </button>
            </div>
        </div>
    );
}

export default Home;
