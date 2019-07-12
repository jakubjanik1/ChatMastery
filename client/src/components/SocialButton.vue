<script>
import GithubIcon from 'vue-material-design-icons/GithubFace';
import FacebookIcon from 'vue-material-design-icons/Facebook';
import TwitterIcon from 'vue-material-design-icons/Twitter';
import GoogleIcon from 'vue-material-design-icons/GooglePlus';

export default {
    name: 'SocialButton',
    components: {
        GithubIcon,
        FacebookIcon,
        TwitterIcon,
        GoogleIcon
    },
    props: {
        type: {
            type: String,
            required: true,
            validator: value => [ 'github', 'facebook', 'google', 'twitter' ].includes(value)
        }
    },
    render() { 
        const Icon = `${ this.type }-icon`;

        return (
            <a class={`social-button social-button--${ this.type }`} 
                href={`http://192.168.0.103:8080/auth/${ this.type }`}
            >
                <Icon class="social-button__icon" size={ 28 } />
            </a> 
        );
    }
}
</script>

<style lang="scss" scoped>
    .social-button {
        text-decoration: none;
        display: flex;
        color: #fff;
        padding: 12px;
        margin: 16px;
        border-radius: 4px;
        width: 100px;
        height: 24px;
        align-items: center;
        justify-content: center;

        $social-list: (
            "github": #333,
            "facebook": #4b70ab,
            "twitter": #3B94D9,
            "google": #DD4B39
        );

       @each $name, $color in $social-list {
           &--#{$name} {
               background: $color;
               transition: .3s ease-in-out;

               &:hover {
                   background: darken($color, 5%);
               }
           }
       }

        &__icon {
            height: 28px;
        }
    }
</style>
