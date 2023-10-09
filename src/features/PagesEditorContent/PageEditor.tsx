import dynamic from 'next/dynamic';
import styles from './PagesEditorContent.module.scss';
import Button from 'components/Button';
import { ISiteInfo } from '@backend/models/SiteInfo/types';
import useEditor from './hooks/useEditor';
import ControlledInput from 'components/ControlledInput';
import { Controller } from 'react-hook-form';
import HelperText from 'components/HelperText';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const editorModules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }, 'bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link'],
        ['clean'],
    ],
};

export type PageEditorProps = {
    page: ISiteInfo;
};

function PageEditor(props: PageEditorProps) {
    const {
        control,
        isUpdatingPageContent,
        title,
        content,
        dataWasChanged,
        titleChangeHandler,
        contentChangeHandler,
        submitHandler,
        cancelClickHandler,
    } = useEditor(props.page);

    return (
        <form className={styles.editor} onSubmit={submitHandler}>
            <div className={styles.inputs}>
                <ControlledInput
                    control={control}
                    name="title"
                    value={title}
                    className={styles.titleInp}
                    placeholder="Название страницы"
                    onChange={titleChangeHandler}
                />
                <Controller
                    control={control}
                    name="content"
                    defaultValue={content}
                    render={({ field: { onChange, onBlur }, fieldState: { invalid, error } }) => (
                        <>
                            <ReactQuill
                                modules={editorModules}
                                className={styles.contentEditor}
                                placeholder="Содержимое страницы"
                                value={content}
                                onChange={(value) => {
                                    contentChangeHandler(value);
                                    onChange(value);
                                }}
                                onBlur={onBlur}
                            />
                            <HelperText error={invalid}>{error?.message}</HelperText>
                        </>
                    )}
                />
            </div>
            {dataWasChanged && (
                <div className={styles.actions}>
                    <Button color="red" disabled={isUpdatingPageContent} onClick={cancelClickHandler}>
                        Отмена
                    </Button>
                    <Button type="submit" loading={isUpdatingPageContent}>
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    );
}

export default PageEditor;
