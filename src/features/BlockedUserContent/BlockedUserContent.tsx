import c from 'clsx';
import Container from 'components/Container';
import customPageStyles from 'features/CustomPageContent/CustomPageContent.module.scss';

function BlockedUserContent() {
    return (
        <Container className="flex center">
            <div className={c(customPageStyles.content, customPageStyles.error)}>Вы заблокированы за нарушение правил сайта</div>
        </Container>
    );
}

export default BlockedUserContent;
