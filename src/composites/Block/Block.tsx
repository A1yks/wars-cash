import React from 'react';
import BlockHeader, { BlockHeaderProps } from 'components/BlockHeader/BlockHeader';
import BlockContainer, { BlockContainerProps } from 'components/BlockContainer/BlockContainer';

export type BlockProps = BlockHeaderProps & BlockContainerProps;

const Block = React.forwardRef<HTMLDivElement, BlockProps>((props, ref) => {
    const { title, rightContent, children, ...containerProps } = props;

    return (
        <BlockContainer ref={ref} {...containerProps}>
            <BlockHeader title={title} rightContent={rightContent} />
            {children}
        </BlockContainer>
    );
});

Block.displayName = 'Block';

export default Block;
