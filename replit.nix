{ pkgs }: {
	deps = with pkgs; [
		nodejs-16_x
		nodePackages.typescript-language-server
		nodePackages.node-pre-gyp
		libpng
		libjpeg
		libuuid
		python39
		# Add more packages if you want.
	];
}