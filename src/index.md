    state: {
        products: [
            { name: '鼠标', price: 20 },
        ]

        state的值在组件内部调用

        方式一:
        computed:{
            products:()=>{return this.$store.products}
        }

        方式二:
        import {mapState} from 'vuex'
        computed:{
            ...mapState(['products'])
        }
        
        在页面可以直接调用{{products}}，在js要用this.products
    },


    getters: {
        saleProducts: (state) => {
            //对state处理加工后返回
            let saleProducts = state.products.map(product => {
                return {
                    name: product.name,
                    price: product.price / 2
                }
            })
            return saleProducts;
        }

        getters的值在组件内部调用
        
        方式一:
        computed:{
            saleProducts:()=>{return this.$store.getters.saleProducts}
        }

        方式二:
        import {mapGetters} from 'vuex'
        computed:{
            ...mapGetters(['saleProducts'])
        }

        在页面可以直接调用{{saleProducts}}，在js要用this.saleProducts
    },


    mutations:{ 
        第一个参数是state, 第二参数是payload, 也就会自定义的参数.
        minusPrice (state, payload ) {
          let newPrice = state.products.forEach( product => {
            product.price -= payload
          })
        }
      }

      mutations的方法在组件内部调用
      方式一:
      methods: {
        minusPrice() {
            this.$store.commit('minusPrice', 2); //提交`minusPrice,payload为2
        }
    }
      方式二:
      import {mapMutations} from 'vuex'
      methods:{
          ...mapMutations(['minusPrice'])
      }

      js使用this.minusPrice()调用

    actions:{ 
        第一个参数是context, 是一个与store实例具有相同属性和方法的对象,就理解为store

        minusPriceAsync( context, payload ) {
          setTimeout( () => {
            context.commit( 'minusPrice', payload ); //context提交
          }, 2000)
        }
      }

      actions方法在组件内部调用
      方式一:
      methods: {
        minusPriceAsync() {
            this.$store.dispatch('minusPriceAsync', 5); //分发actions中的minusPriceAsync这个异步函数
        }
    }
      方式二:
      import {mapActions} from 'vuex'
      methods:{
          ...mapActions(['minusPriceAsync'])
      }

      js使用this.minusPrice()调用

vuex模块化 https://juejin.im/post/5d688800f265da03a0498d75