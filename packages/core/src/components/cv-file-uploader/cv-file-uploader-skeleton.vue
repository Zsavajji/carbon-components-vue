<template>
  <div :class="`${carbonPrefix}--form-item`">
    <cv-skeleton-text heading width="100px" />
    <cv-skeleton-text width="225px" :class="`${carbonPrefix}--label-description`" />
    <cv-button-skeleton />
  </div>
</template>

<script>
import CvSkeletonText from '../cv-skeleton-text/cv-skeleton-text';
import CvButtonSkeleton from '../cv-button/cv-button-skeleton';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvFileUploaderSkeleton',
  mixins: [carbonPrefixMixin],
  components: {
    CvSkeletonText,
    CvButtonSkeleton,
  },
};
</script>
