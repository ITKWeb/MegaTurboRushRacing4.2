!function(b,c,d,f,h,e){this.$=function(a){return new $[d].i(a)};e={length:0,i:function(a){c.push.apply(this,a&&a.nodeType?[a]:""+a===a?c.slice.call(b.querySelectorAll(a)):/^f/.test(typeof a)?$(b).r(a):null)},r:function(a){/c/.test(b.readyState)?a():$(b).on("DOMContentLoaded",a);return this},on:function(a,g){return this.each(function(b){b["add"+f](a,g)})},off:function(a,b){return this.each(function(c){c["remove"+f](a,b)})},each:function(a,b){c.forEach.call(b=this,a);return b},splice:c.splice};$[d]=e.i[d]=e}(document,[],"prototype","EventListener");