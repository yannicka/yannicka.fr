window.onload = ->
	document.addEventListener('deviceready', on_devide_ready, false)

on_devide_ready = ->
	admob_ios_key     = '-'
	admob_android_key = 'ca-app-pub-8910256399447461/6325603433'

	ad_id = admob_android_key;
	#ad_id = if navigator.userAgent.indexOf('Android') >=0 then admob_android_key else admob_ios_key

	if window.plugins and window.plugins.AdMob
		am = window.plugins.AdMob

		am.createBannerView(
			publisherId: ad_id
			adSize:      am.AD_SIZE.BANNER
			bannerAtTop: no
		, ->
			am.requestAd(isTesting: yes, extras:
				color_bg:     'AAAAFF'
				color_bg_top: 'FFFFFF'
				color_border: 'FFFFFF'
				color_link:   '000080'
				color_text:   '808080'
				color_url:    '008000'
			, ->
				show_ad(yes)
			, ->
				alert('failed to request ad')
			)
		, ->
			#alert('failed to create ad view')
		)
	else
		#alert('AdMob plugin not available/ready.')
