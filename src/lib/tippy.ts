import 'tippy.js/animations/perspective-subtle.css'
import { createTippy } from 'svelte-tippy'
import 'tippy.js/dist/tippy.css'

export const tippy = createTippy({
	animation: 'perspective-subtle',
	theme: 'own',
	placement: 'bottom',
	arrow: false,
})
