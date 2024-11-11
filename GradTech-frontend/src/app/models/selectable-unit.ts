import { UnitElement } from '@models/unit';

export interface SelectableUnitElement extends UnitElement {
  selected?: boolean;
}
