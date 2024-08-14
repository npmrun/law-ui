<template>
    <a-spin
        :spinning="loading"
        size="large"
        :tip="loadingText"
        wrapperClassName="law-ant-load-view"
    >
        <div class="wrapper">
            <slot name="error">
                <a-result
                    v-if="error && showIcon"
                    status="error"
                    :title="errorTitle"
                    :sub-title="errorSubTitle"
                >
                    <template #extra>
                        <a-button
                            v-if="retry"
                            type="primary"
                            @click="clickRetry"
                            >{{ errorBtnText }}</a-button
                        >
                    </template>
                </a-result>
                <template v-if="error && !showIcon">
                    <div
                        style="
                            text-align: center;
                            padding: 8px 0;
                            font-size: 16px;
                            font-weight: bold;
                        "
                    >
                        {{ errorTitle }}
                    </div>
                    <div
                        style="
                            text-align: center;
                            padding: 8px 0;
                            font-size: 14px;
                            color: #00000073;
                        "
                    >
                        {{ errorSubTitle }}
                    </div>
                    <div style="text-align: center">
                        <a-button
                            v-if="retry"
                            type="primary"
                            @click="clickRetry"
                            >{{ errorBtnText }}</a-button
                        >
                    </div>
                </template>
            </slot>
            <div v-if="empty && !error && showIcon">
                <slot name="empty">
                    <Empty
                        :description="emptyText"
                        :layout="emptyLayout"
                    ></Empty>
                </slot>
            </div>
            <template v-if="empty && !error && !showIcon">
                <div
                    style="text-align: center; padding: 8px 0; font-size: 16px"
                    :style="[
                        emptyLayout === 'absolute'
                            ? {
                                  position: 'absolute',
                                  left: '50%',
                                  top: '50%',
                                  transform: 'translate(-50%, -50%)',
                              }
                            : {},
                    ]"
                >
                    {{ emptyText }}
                </div>
            </template>
            <template v-if="isShow">
                <slot></slot>
            </template>
        </div>
    </a-spin>
</template>

<script lang="ts" setup>
import Empty from '@law-ui/components/empty'
import { computed } from 'vue'
const props = withDefaults(
    defineProps<{
        alwaysShow?: boolean
        loading?: boolean
        error?: boolean
        showIcon?: boolean
        empty?: boolean
        loadingText?: string
        errorTitle?: string
        emptyLayout?: 'absolute' | 'inline'
        errorBtnText?: string
        errorSubTitle?: string
        emptyText?: string
        retry?: (...argu: any) => void
    }>(),
    {
        alwaysShow: true,
        showIcon: true,
        loading: false,
        empty: false,
        error: false,
        emptyLayout: 'inline',
        errorTitle: '获取数据失败',
        errorBtnText: '点击重试',
        errorSubTitle: '请检查您的网络连接后重试.',
        loadingText: '加载中...',
        emptyText: '暂无数据',
    }
)

const isShow = computed(() => {
    if (props.alwaysShow) {
        return true
    }
    if (props.error) {
        return false
    }
    if (props.empty) {
        return false
    }
    return true
})

function clickRetry() {
    props.retry && props.retry()
}
</script>

<style lang="less" scoped>

</style>
