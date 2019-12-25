# Vue CLI快速原型开发

- [快速原型开发](https://cli.vuejs.org/zh/guide/prototyping.html)

## 安装

```bash
npm install -g @vue/cli
npm install -g @vue/cli-service-global
```

## 运行

```bash
vue serve MyComponent.vue
```

## `props / $emit`

- 父组件向子组件传值 

```bash
vue serve props-emit/ParentToChild/Parent.vue 
```

- 子组件向父组件传值

```bash
vue serve props-emit/ChildToParent/Parent.vue
```

## `$children / $parent`

```bash
vue serve children-parent/Parent.vue
```

## `provide/ inject`

```bash
vue serve provide-inject/Parent.vue
```

## `ref / refs`

```bash
vue serve ref-refs/Parent.vue
```

## eventBus

```bash
vue serve eventBus/Parent.vue
```

## `$attrs / $listeners`



## Vuex
## `localStorage / sessionStorage`
