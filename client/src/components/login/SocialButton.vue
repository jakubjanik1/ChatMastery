<script>
import GithubIcon from 'vue-material-design-icons/GithubFace';
import FacebookIcon from 'vue-material-design-icons/Facebook';
import SpotifyIcon from 'vue-material-design-icons/Spotify';
import GoogleIcon from 'vue-material-design-icons/GooglePlus';

export default {
    name: 'SocialButton',
    components: {
        GithubIcon,
        FacebookIcon,
        SpotifyIcon,
        GoogleIcon
    },
    props: {
        type: {
            type: String,
            required: true,
            validator: value => [ 'github', 'facebook', 'google', 'spotify' ].includes(value)
        }
    },
    render() { 
        const Icon = `${ this.type }-icon`;

        return (
            <a class={`social-button social-button--${ this.type }`} 
                href={`${ this.$baseUrl }/auth/${ this.type }`}
            >
                <Icon class="social-button__icon" size={ 28 } title="" />
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
        width: 64px;
        height: 22px;
        align-items: center;
        justify-content: center;

        $social-list: (
            "github": #333,
            "facebook": #4b70ab,
            "spotify": #1db954,
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
