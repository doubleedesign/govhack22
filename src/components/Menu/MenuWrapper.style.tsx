import styled from 'styled-components';

export const MenuWrapper = styled.nav`
	width: 25vw;
	height: 100vh;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	align-content: center;
`;

interface MenuItemProps {
	selected: boolean
}

export const MenuItem = styled.label<MenuItemProps>`
	width: 100%;
	flex-basis: 100%;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	font-size: 0.9rem;
	font-family: 'Arial', Helvetica, sans-serif;
	box-sizing: border-box;
	padding: 0.5rem 0.25rem;
    background: ${props => props.selected ? '#EFEFEF' : 'transparent'};
    color: ${props => props.selected ? '#111' : '#555'};
    font-weight: ${props => props.selected ? 'bold' : 'normal'};
	cursor: pointer;
    transition: all 0.3s ease;
	
	input {
		width: 0;
		opacity: 0;
	}
	
	img {
        filter: ${props => props.selected ? '100%' : '0'};
        opacity: ${props => props.selected ? '1' : '0.2'};
		transition: all 0.3s ease;
	}
	
	&:hover, &:focus, &:active {
		background: #EFEFEF;
	}
`;

export const ItemLabelWrapper = styled.span`
	display: block;
`;

export const ItemLabel = styled.span`
	display: block;
`;

export const DomainLabel = styled.span`
    background: #9a9a9a;
    color: white;
    padding: 0.25rem;
    display: inline-block;
    font-size: 0.6em;
    text-transform: uppercase;
	margin-right: 0.25rem;
	font-weight: normal;
`;
