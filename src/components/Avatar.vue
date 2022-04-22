<script setup lang="ts">
import { watch, ref, withDefaults } from 'vue'

interface Props {
  address?: string;
  size?: string;
  imgSrc?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: '22'
})

const imgUrl = ref<string>('')
const showImg = ref(false)

watch(
  () => props.imgSrc,
  () => {
    if (props.imgSrc) {
      const img = new Image();
      img.onload = () => {
        imgUrl.value = img.src;
        showImg.value = true;
      };
      img.src = props.imgSrc as string;
    }
  },
  { immediate: true }
)
</script>

<template>
  <span class="flex shrink-0 items-center justify-center">
    <img
      :src="
        imgUrl ||
        `https://stamp.fyi/avatar/eth:${address}?s=${parseInt(size) * 2}`
      "
      class="rounded-full"
      :class="'bg-[color:var(--border-color)]'"
      :style="{
        width: `${parseInt(size)}px`,
        height: `${parseInt(size)}px`,
        minWidth: `${parseInt(size)}px`
      }"
    />
  </span>
</template>