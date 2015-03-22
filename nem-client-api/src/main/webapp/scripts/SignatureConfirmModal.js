"use strict";

define(['NccModal', 'Utils'], function(NccModal, Utils) {
	return NccModal.extend({
		confirm: function() {
            this.lockAction();

            var self = this;
            var success = false;
            ncc.postRequest('wallet/account/signature/send', this.get('requestData'), function(data) {
                success = true;
                self.closeModal();
            	ncc.getModal('signMultisig').closeModal();

                ncc.showMessage(ncc.get('texts.modals.common.success'), ncc.get('texts.modals.sendNem.successMessage'));
                ncc.refreshInfo();
            },
            {
                complete: function() {
                    if (! success) {
                        self.closeModal();
                        ncc.getModal('signMultisig').closeModal();

                        ncc.showMessage(ncc.get('texts.modals.common.unknown'), ncc.get('texts.modals.common.unknownMessage'));
                    }

                    self.unlockAction();
                }
            });
		}
	});
});