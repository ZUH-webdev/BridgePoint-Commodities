		const revealElements = document.querySelectorAll('.reveal');
		const header = document.querySelector('.site-header');
		const hamburger = document.getElementById('hamburger');
		const siteNav = document.getElementById('site-nav');

		if ('IntersectionObserver' in window) {
			const observer = new IntersectionObserver((entries, observerInstance) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observerInstance.unobserve(entry.target);
					}
				});
			}, {
				threshold: 0.16,
				rootMargin: '0px 0px -8% 0px'
			});

			revealElements.forEach((element) => observer.observe(element));
		} else {
			revealElements.forEach((element) => element.classList.add('is-visible'));
		}

		if (header && hamburger && siteNav) {
			const closeMenu = () => {
				header.classList.remove('is-nav-open');
				hamburger.setAttribute('aria-expanded', 'false');
			};

			hamburger.addEventListener('click', () => {
				const isOpen = header.classList.toggle('is-nav-open');
				hamburger.setAttribute('aria-expanded', String(isOpen));
			});

			siteNav.querySelectorAll('a').forEach((link) => {
				link.addEventListener('click', closeMenu);
			});

			window.addEventListener('resize', () => {
				if (window.innerWidth > 768) {
					closeMenu();
				}
			});
		}
