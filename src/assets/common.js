import Swal from 'sweetalert2';

export function sweetalert(textData, iconType, callback) {
	const swalTailWind = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-active btn-primary',
		},
		buttonsStyling: false,
	});
	var text = '';
	if (iconType == 'error') text = '안돼 돌아가';
	else if (iconType == 'success') text = '조아써!';
	else if (iconType == 'warning') text = '잘 생각해라..';
	swalTailWind
		.fire({
			title: textData,
			text: text,
			icon: iconType,
			confirmButtonText: 'Ok',
		})
		.then(function () {
			if (callback !== undefined) callback();
		});
}

export function sweetconfirm(textData, iconType) {
	const swalTailWind = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-active btn-accent mr-5',
			cancelButton: 'btn btn-active btn-ghost',
		},
		buttonsStyling: false,
	});
	var text = '';
	if (iconType == 'error') text = '안돼 돌아가';
	else if (iconType == 'success') text = '조아써!';
	else if (iconType == 'warning') text = '잘 생각해라..';

	return swalTailWind.fire({
		title: textData,
		text: text,
		icon: iconType,
		confirmButtonText: '예스 지웁시다!',
		cancelButtonText: '안돼요 한번더 생각해볼게요',
		showCancelButton: true,
	});
}
