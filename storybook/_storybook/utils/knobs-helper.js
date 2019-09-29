import { number } from '@storybook/addon-knobs';

const parsePreKnobs = (variant, preKnobs) => {
  return () => {
    const knobs = { group: [], data: {}, props: {} };

    const getValueFunc = preKnob => {
      if (preKnob.value) {
        return preKnob.value;
      } else {
        if (preKnob.type === number) {
          // use 0 if number is set to null
          return val => (val === null ? 0 : val);
        } else {
          return val => val;
        }
      }
    };
    const parsePreKnobsInner = (thePreNobs, includes, excludes) => {
      for (let key in thePreNobs) {
        const preKnob = thePreNobs[key];

        if (!knobs.group[preKnob.group]) {
          knobs.group[preKnob.group] = '';
        }

        // do after creating blank group
        if (excludes && excludes.includes(key)) {
          continue; // skip this item
        }

        if (includes && !includes.includes(key)) {
          continue; // skip this item
        }

        let prefix = preKnob.inline ? ' ' : '\n  ';
        let value;
        if (preKnob.sync || preKnob.prop) {
          value = getValueFunc(preKnob);
        }

        if (preKnob.sync) {
          // sync - like prop but with preKnob.sync
          knobs.group[preKnob.group] += `${prefix}:${preKnob.sync}.sync="${key}"`;
          knobs.data[key] = value(preKnob.type(...preKnob.config));
        } else if (preKnob.prop) {
          // prop
          if (preKnob.group) {
            // only prop with group are added to template
            knobs.group[preKnob.group] += `${prefix}:${preKnob.prop}="${key}"`;
          }
          knobs.props[key] = {
            default: value(preKnob.type(...preKnob.config)),
          };
        } else if (preKnob.slot) {
          // slot
          if (preKnob.slot !== 'default') {
            knobs.group[preKnob.group] += `${prefix}<template slot="${preKnob.slot}">${preKnob.value}</template>`;
          } else {
            knobs.group[preKnob.group] += `${prefix}${preKnob.value}`;
          }
        } else {
          // default
          knobs.group[preKnob.group] += `${prefix}${preKnob.value}`;
        }
      }
    };

    if (variant.extra) {
      parsePreKnobsInner(variant.extra);
    }
    parsePreKnobsInner(preKnobs, variant.includes, variant.excludes);

    return knobs;
  };
};

const getStorySet = (variants, preKnobs) => {
  let storySet = [];

  for (let index in variants) {
    storySet.push({
      name: variants[index].name,
      knobs: parsePreKnobs(variants[index], preKnobs),
      skip: variants[index].skip,
    });
  }
  return storySet;
};

export default { getStorySet };
