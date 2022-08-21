import React, { useContext, useEffect } from 'react';
import { MenuItem, MenuWrapper, ItemLabelWrapper, ItemLabel, DomainLabel } from './MenuWrapper.style';
import { Context } from '../../context';

export const Menu: React.FC = function() {
	// @ts-ignore
	const { selectedGroups, setSelectedGroups } = useContext(Context);

	return (
		<MenuWrapper>
			{
				// Ref: https://stackoverflow.com/a/62391577
				// @ts-ignore
				selectedGroups.map((item, index) =>
					<MenuItem selected={item.selected}>
						<img src={item.icon} alt=""/>
						<input
							type="checkbox"
							onChange={e => {
								const newCheckboxes = [...selectedGroups];
								newCheckboxes[index].selected = e.target.checked;
								setSelectedGroups(newCheckboxes);
							}}
							checked={item.selected}
						/>
						<ItemLabelWrapper>
							<ItemLabel>{item.label}</ItemLabel>
							{item.domain.map((domain) => {
								return <DomainLabel>{domain}</DomainLabel>;
							})}
						</ItemLabelWrapper>
					</MenuItem>
				)
			}
		</MenuWrapper>
	);
};

export default Menu;