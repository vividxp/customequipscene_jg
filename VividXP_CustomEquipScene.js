//=============================================================================
// VividXP_CustomEquipScene.js
//=============================================================================

/*:
* @plugindesc VividXP: Custom Equip Scene v1.0
* @author Lene
*
* @help This script will replace RPG Maker MV's default Equip Scene with a
* custom one that features:
* * An Actor select window that enables players to switch between party actors
*   without leaving the equip scene
* * Left and Right equip slot windows that enable players to view an actor's
*   equipped items at a glance
* * An Actor Bust window for increased visual interest
* * A menu command window that can be customized to display menu commands as
*   text or icons
*
* Custom Image Locations
* -----------------------
* Actor Select Faces - the default face image for the actor is used
*
* Actor Bust - you should save all character bust images in the img/pictures
* folder, then in the actor's note section in the database, enter the following
* <vxp:filename> where 'filename' is the name of the character bust image file
* without the extension.
*
* Equip Slot Icons - You have the option of either selecting an icon from the
* default icon set, or creating your own custom icons and saving them in the
* img/system folder, then going to the database and entering <vxp:filename> in
* the note section where 'filename' is the name of the icon image without the
* file extension.
*
* Menu Command Icons - You should save your icons as an icon set (all icons in
* in the same image) in the img/system folder. They should be arranged in the
* order you expect your menu item be in.
*
* @param Actor Select Window Height
* @desc Height of actor select window (top). Default: 116
* @default 116
*
* @param Actor Select Window Padding
* @desc Amount of padding inside actor select window. Default: 10
* @default 10
*
* @param Actor Select Item Size
* @desc Size (in pixels) face image to be used in Actor Select Window. Default: 96
* @default 96
*
* @param Equip Slot Window Width
* @desc Width of left and right equip slot windows. Default: 116
* @default 116
*
* @param Equip Slot Window Padding
* @desc Amount of padding inside left and right equip slot windows. Default: 10
* @default 10
*
* @param Equip Slot Item Size
* @desc Size (in pixels) of icon to be used in left and right equip slot windows. Default: 96
* @default 96
*
* @param Actor Bust Window Width
* @desc Width of actor bust window. Default: 301
* @default 301
*
* @param Actor Bust Image Width
* @desc Width (in pixels) of actor bust image. Default: 265
* @default 265
*
* @param Actor Bust Image Height
* @desc Height (in pixels) of actor bust image. Default: 440
* @default 440
*
* @param Equip Status Window Height
* @desc Height of equip status window. Default: 116
* @default 116
*
* @param Equip Status Line Height
* @desc Height of each line in equip status window. Default: 20
* @default 20
*
* @param Equip Status Font Size
* @desc Font size of text in equip status window. Default: 18
* @default 18
*
* @param Equip Status Text Padding
* @desc Padding around text in equip status window. Default: 1
* @default 1
*
* @param Menu Command Window Height
* @desc Height of menu command window (bottom). Default: 68
* @default 68
*
* @param Menu Command Window Padding
* @desc Amount of padding around menu command window. Default: 10
* @default 10
*
* @param Menu Command Item Type
* @desc How menu command window items should be displayed (text/icons). Default: text
* @default text
*
* @param Menu Command Item Size
* @desc Size of menu command items. Default: 48
* @default 48
*
* @param Menu Command Icon File
* @desc Name of image file (sans extention) for menu command icons. Image must be saved in the img/system folder. Default: menu_icons
* @default menu_icons
*
* @param Menu Command Activation Key
* @desc What key should activate the bottom menu window. Check Input.keyMapper in rpg_core for options. Default: shift
* @default shift
*
* @param Menu Command Num Items
* @desc how many menu commands are there in the menu command window. Only applicable if item type is 'icons'. Default: 7
* @default 7
*/

var VividXP = VividXP || {};
VividXP.CustomEquipScene = {};
VividXP.CustomEquipScene.Parameters = PluginManager.parameters('VividXP_CustomEquipScene');

VividXP.CustomEquipScene.ActorSelectWindowHeight = Number(
    VividXP.CustomEquipScene.Parameters["Actor Select Window Height"]
);

VividXP.CustomEquipScene.ActorSelectWindowPadding = Number(
    VividXP.CustomEquipScene.Parameters["Actor Select Window Padding"]
);

VividXP.CustomEquipScene.ActorSelectItemSize = Number(
    VividXP.CustomEquipScene.Parameters["Actor Select Item Size"]
);

VividXP.CustomEquipScene.EquipSlotWindowWidth = Number(
    VividXP.CustomEquipScene.Parameters["Equip Slot Window Width"]
);

VividXP.CustomEquipScene.EquipSlotWindowPadding = Number(
    VividXP.CustomEquipScene.Parameters["Equip Slot Window Padding"]
);

VividXP.CustomEquipScene.EquipSlotItemSize = Number(
    VividXP.CustomEquipScene.Parameters["Equip Slot Item Size"]
);

VividXP.CustomEquipScene.ActorBustWindowWidth = Number(
    VividXP.CustomEquipScene.Parameters["Actor Bust Window Width"]
);

VividXP.CustomEquipScene.ActorBustImageWidth = Number(
    VividXP.CustomEquipScene.Parameters["Actor Bust Image Width"]
);

VividXP.CustomEquipScene.ActorBustImageHeight = Number(
    VividXP.CustomEquipScene.Parameters["Actor Bust Image Height"]
);

VividXP.CustomEquipScene.EquipStatusWindowHeight = Number(
    VividXP.CustomEquipScene.Parameters["Equip Status Window Height"]
);

VividXP.CustomEquipScene.EquipStatusLineHeight = Number(
    VividXP.CustomEquipScene.Parameters["Equip Status Line Height"]
);

VividXP.CustomEquipScene.EquipStatusFontSize = Number(
    VividXP.CustomEquipScene.Parameters["Equip Status Font Size"]
);

VividXP.CustomEquipScene.EquipStatusTextPadding = Number(
    VividXP.CustomEquipScene.Parameters["Equip Status Text Padding"]
);

VividXP.CustomEquipScene.MenuCommandWindowHeight = Number(
    VividXP.CustomEquipScene.Parameters["Menu Command Window Height"]
);

VividXP.CustomEquipScene.MenuCommandWindowPadding = Number(
    VividXP.CustomEquipScene.Parameters["Menu Command Window Padding"]
);

VividXP.CustomEquipScene.MenuCommandItemSize = Number(
    VividXP.CustomEquipScene.Parameters["Menu Command Item Size"]
);

VividXP.CustomEquipScene.MenuCommandItemType = String(
    VividXP.CustomEquipScene.Parameters["Menu Command Item Type"]
);

VividXP.CustomEquipScene.MenuCommandIconFile = String(
    VividXP.CustomEquipScene.Parameters["Menu Command Icon File"]
);

VividXP.CustomEquipScene.MenuCommandActivationKey = String(
    VividXP.CustomEquipScene.Parameters["Menu Command Activation Key"]
);

VividXP.CustomEquipScene.MenuCommandNumItems = Number(
    VividXP.CustomEquipScene.Parameters["Menu Command Num Items"]
);

(function() {

    Window_Base.prototype.reserveFaceImages = function() {
        $gameParty.members().forEach(function(actor) {
            ImageManager.reserveFace(actor.faceName());
            // actor character busts are reserved as soon as possible
            ImageManager.reservePicture($dataActors[actor._actorId].meta.vxp);
            if (actor.equips()[0]){
                ImageManager.reserveBitmap('img/system/', actor.equips()[0].meta.vxp);
            }
        }, this);
        // reserve custom equip scene menu icons
        ImageManager.reserveBitmap('img/system/', VividXP.CustomEquipScene.MenuCommandIconFile);
    };

    Scene_Menu.prototype.onPersonalOk = function() {
        switch (this._commandWindow.currentSymbol()) {
        case 'skill':
            SceneManager.push(Scene_Skill);
            break;
        case 'equip':
            // custom equip scene goes here
            SceneManager.push(Scene_CustomEquip);
            break;
        case 'status':
            SceneManager.push(Scene_Status);
            break;
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_CustomEquip
    //-----------------------------------------------------------------------------

    function Scene_CustomEquip() {
        this.initialize.apply(this, arguments);
    }

    Scene_CustomEquip.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_CustomEquip.prototype.constructor = Scene_CustomEquip;

    Scene_CustomEquip.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_CustomEquip.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createActorSelectWindow();
        this.createMenuCommandWindow();
        this.createEquipSlotWindows();
        this.createActorBustWindow();
        this.createEquipStatusWindow();
        this.createItemWindow();
        this.refreshActor();
    };

    Scene_CustomEquip.prototype.createActorSelectWindow = function() {
        this._actorSelectWindow = new Window_ActorSelect(0, 0);
        this._actorSelectWindow.reserveFaceImages();
        this._actorSelectWindow.setHandler('ok', this.onSelectOk.bind(this));
        this._actorSelectWindow.setHandler('cancel', this.popScene.bind(this));
        this._actorSelectWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._actorSelectWindow.setHandler('pageup',   this.previousActor.bind(this));
        this._actorSelectWindow.setHandler(VividXP.CustomEquipScene.MenuCommandActivationKey, this.onMenuKeyPress.bind(this));
        this.addWindow(this._actorSelectWindow);
        this._actorSelectWindow.selectLast();
    };

    Scene_CustomEquip.prototype.createMenuCommandWindow = function() {
        var wy = Graphics.boxHeight - VividXP.CustomEquipScene.MenuCommandWindowHeight;
        var ww = Graphics.boxWidth;
        var wh = VividXP.CustomEquipScene.MenuCommandWindowHeight;
        this._menuCommandWindow = new Window_CustomMenuCommand(0, wy, ww, wh);
        this._menuCommandWindow.loadImages();
        this._menuCommandWindow.setHandler('item',      this.commandItem.bind(this));
        this._menuCommandWindow.setHandler('skill',     this.commandSkill.bind(this));
        this._menuCommandWindow.setHandler('status',    this.commandStatus.bind(this));
        this._menuCommandWindow.setHandler('options',   this.commandOptions.bind(this));
        this._menuCommandWindow.setHandler('save',      this.commandSave.bind(this));
        this._menuCommandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
        this._menuCommandWindow.setHandler('cancel', this.onMenuCancel.bind(this));
        this._menuCommandWindow.setHandler('activate', this.onMenuActivate.bind(this));
        this.addWindow(this._menuCommandWindow);
    };

    Scene_CustomEquip.prototype.createEquipSlotWindows = function() {
        this._activeSlotWindow = null;
        this._leftEquipSlotWindow = new Window_LeftEquipSlot(0, this._actorSelectWindow.windowHeight());
        this._leftEquipSlotWindow.loadImages();
        this._rightEquipSlotWindow = new Window_RightEquipSlot(Graphics.boxWidth-116, this._actorSelectWindow.windowHeight());
        this._rightEquipSlotWindow.loadImages();
        this._leftEquipSlotWindow.setSiblingWindow(this._rightEquipSlotWindow);
        this._rightEquipSlotWindow.setSiblingWindow(this._leftEquipSlotWindow);
        this._leftEquipSlotWindow.setHandler('ok', this.onSlotOk.bind(this));
        this._rightEquipSlotWindow.setHandler('ok', this.onSlotOk.bind(this));
        this._leftEquipSlotWindow.setHandler('cancel', this.onSlotCancel.bind(this));
        this._rightEquipSlotWindow.setHandler('cancel', this.onSlotCancel.bind(this));
        this._leftEquipSlotWindow.setHandler('activate', this.onSlotWindowActivate.bind(this, 'left'));
        this._rightEquipSlotWindow.setHandler('activate', this.onSlotWindowActivate.bind(this, 'right'));
        this._leftEquipSlotWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._leftEquipSlotWindow.setHandler('pageup',   this.previousActor.bind(this));
        this._rightEquipSlotWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._rightEquipSlotWindow.setHandler('pageup',   this.previousActor.bind(this));
        this.addWindow(this._leftEquipSlotWindow);
        this.addWindow(this._rightEquipSlotWindow);
        this._leftEquipSlotWindow.activate();
        this._leftEquipSlotWindow.select(0);
    };

    Scene_CustomEquip.prototype.createActorBustWindow = function() {
        var wx = ((Graphics.boxWidth - this._leftEquipSlotWindow.windowWidth() * 2) / 2) - (VividXP.CustomEquipScene.ActorBustWindowWidth/2) + this._leftEquipSlotWindow.windowWidth();
        var wy = this._actorSelectWindow.windowHeight();
        var ww = VividXP.CustomEquipScene.ActorBustWindowWidth;
        var wh = Graphics.boxHeight - wy - VividXP.CustomEquipScene.MenuCommandWindowHeight - VividXP.CustomEquipScene.ActorSelectWindowHeight;
        this._actorBustWindow = new Window_ActorBust(wx, wy, ww, wh);
        this._actorBustWindow.loadImages();
        this.addWindow(this._actorBustWindow);
    };

    Scene_CustomEquip.prototype.createEquipStatusWindow = function() {
        var wx = this._leftEquipSlotWindow.windowWidth();
        var wy = Graphics.boxHeight - this._menuCommandWindow.windowHeight() - 116;
        this._equipStatusWindow = new Window_CustomEquipStatus(wx, wy);
        this._leftEquipSlotWindow.setStatusWindow(this._equipStatusWindow);
        this._rightEquipSlotWindow.setStatusWindow(this._equipStatusWindow);
        this.addWindow(this._equipStatusWindow);
    };

    Scene_CustomEquip.prototype.createItemWindow = function() {
        var wx = this._leftEquipSlotWindow.windowWidth();
        var wy = this._actorSelectWindow.windowHeight();
        var ww = Graphics.boxWidth - wx;

        this._helpWindow = new Window_CustomEquipItemHelp(wx, wy, ww, 2);
        var iwy = wy + this._helpWindow.fittingHeight(2);
        var wh = Graphics.boxHeight - iwy - 116 - 68;
        this._itemWindow = new Window_CustomEquipItemList(wx, iwy, ww, wh);
        this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this._leftEquipSlotWindow.setItemWindow(this._itemWindow);
        this._rightEquipSlotWindow.setItemWindow(this._itemWindow);
        this._itemWindow.setStatusWindow(this._equipStatusWindow);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this.addWindow(this._helpWindow);
        this.addWindow(this._itemWindow);
    };

    Scene_CustomEquip.prototype.refreshActor = function() {
        var actor = this.actor();
        this._actorSelectWindow.setActor(actor);
        this._leftEquipSlotWindow.setActor(actor);
        this._rightEquipSlotWindow.setActor(actor);
        this._itemWindow.setActor(actor);
        this._actorBustWindow.setActor(actor);
        this._equipStatusWindow.setActor(actor);
    };

    Scene_CustomEquip.prototype.commandGameEnd = function() {
        SceneManager.goto(Scene_GameEnd);
    };

    Scene_CustomEquip.prototype.commandItem = function() {
        SceneManager.goto(Scene_Item);
    };

    Scene_CustomEquip.prototype.commandOptions = function() {
        SceneManager.goto(Scene_Options);
    };

    Scene_CustomEquip.prototype.commandSave = function() {
        SceneManager.goto(Scene_Save);
    };

    Scene_CustomEquip.prototype.commandSkill = function() {
        SceneManager.goto(Scene_Skill);
    };

    Scene_CustomEquip.prototype.commandStatus = function() {
        SceneManager.goto(Scene_Status);
    };

    Scene_CustomEquip.prototype.onActorChange = function() {
        this.refreshActor();
        this._leftEquipSlotWindow.activate();
        this._leftEquipSlotWindow.select(0);

    };

    Scene_CustomEquip.prototype.onItemOk = function() {
        SoundManager.playEquip();
        if ( this._activeSlotWindow === 'left') {
            this.actor().changeEquip(this._leftEquipSlotWindow.index(), this._itemWindow.item());
            this._leftEquipSlotWindow.activate();
            this._leftEquipSlotWindow.refresh();
        } else if ( this._activeSlotWindow === 'right') {
            this.actor().changeEquip(this._rightEquipSlotWindow.index()+4, this._itemWindow.item());
            this._rightEquipSlotWindow.activate();
            this._rightEquipSlotWindow.refresh();
        }
        this._itemWindow.deselect();
        this._itemWindow.refresh();
        this._equipStatusWindow.refresh();
        this._itemWindow.close();
        this._helpWindow.close();

    };

    Scene_CustomEquip.prototype.onItemCancel = function() {
        if (this._activeSlotWindow === 'left') {
            this._leftEquipSlotWindow.activate();
        } else if (this._activeSlotWindow === 'right') {
            this._rightEquipSlotWindow.activate();
        }
        this._itemWindow.deselect();
        this._equipStatusWindow.refresh();
        this._itemWindow.close();
        this._helpWindow.close();

    };

    Scene_CustomEquip.prototype.onMenuActivate = function() {
        this._actorSelectWindow.deactivate();
        this._leftEquipSlotWindow.deactivate();
        this._rightEquipSlotWindow.deactivate();
        this._itemWindow.deactivate();
    };

    Scene_CustomEquip.prototype.onMenuCancel = function() {
        this._menuCommandWindow.deactivate();
        if (this._itemWindow.isOpen()){
            this._itemWindow.activate();
            this._itemWindow.select(0);
        } else {
            this._actorSelectWindow.activate();
            this._actorSelectWindow.selectLast();
        }
    };

    Scene_CustomEquip.prototype.onSelectOk = function() {
        this.updateActor();
        this.refreshActor();
        this._actorSelectWindow.deselect();
        this._leftEquipSlotWindow.activate();
        this._leftEquipSlotWindow.select(0);
    };

    Scene_CustomEquip.prototype.onSlotOk = function() {
        if (this._activeSlotWindow === 'left') {
            this._itemWindow.x = this._leftEquipSlotWindow.windowWidth();
            this._helpWindow.x = this._leftEquipSlotWindow.windowWidth();
        } else if (this._activeSlotWindow === 'right') {
            this._itemWindow.x = 0;
            this._helpWindow.x = 0;
        }
        this._itemWindow.activate();
        this._itemWindow.select(0);
        this._itemWindow.open();
        this._helpWindow.open();
    };

    Scene_CustomEquip.prototype.onSlotCancel = function() {
        this._leftEquipSlotWindow.deselect();
        this._rightEquipSlotWindow.deselect();
        this._actorSelectWindow.activate();
        this._actorSelectWindow.selectLast();
    };

    Scene_CustomEquip.prototype.onSlotWindowActivate = function(activeWindow) {
        if (activeWindow === 'left') {
            this._activeSlotWindow = 'left';
        } else if (activeWindow === 'right') {
            this._activeSlotWindow = 'right';
        }
    };

    Scene_CustomEquip.prototype.onMenuKeyPress = function() {
        this._menuCommandWindow.activate();
        this._menuCommandWindow.select(0);
    };

    //-------------------------------------------------------------------------
    // Window_ActorSelect
    //-------------------------------------------------------------------------

    function Window_ActorSelect() {
        this.initialize.apply(this, arguments);
    }

    Window_ActorSelect.prototype = Object.create(Window_Selectable.prototype);
    Window_ActorSelect.prototype.constructor = Window_ActorSelect;

    Window_ActorSelect.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.rightArrowVisible = false;
        this.leftArrowVisible = false;
        this.refresh();
    };

    Window_ActorSelect.prototype.processHandling = function() {
        Window_Selectable.prototype.processHandling.call(this);
        if (this.isOpenAndActive()) {
            if (this.isHandled('shift') && Input.isTriggered('shift')) {
                this.processShift();
            }
        }
    };

    Window_ActorSelect.prototype.processShift = function() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callHandler('shift');
    };

    Window_ActorSelect.prototype.standardPadding = function() {
        return VividXP.CustomEquipScene.ActorSelectWindowPadding;
    };

    Window_ActorSelect.prototype._createAllParts = function() {
        Window.prototype._createAllParts.call(this);
        this._leftArrowSprite = new Sprite();
        this._rightArrowSprite = new Sprite();
        this.addChild(this._leftArrowSprite);
        this.addChild(this._rightArrowSprite);
    };

    Window_ActorSelect.prototype._refreshArrows = function() {
        var w = this._width;
        var h = this._height;
        this._leftArrowSprite.bitmap = this._windowskin;
        this._leftArrowSprite.bitmap = this._windowskin;
        this._leftArrowSprite.anchor.x = 0;
        this._leftArrowSprite.anchor.y = 0.5;
        this._leftArrowSprite.setFrame(120, 40, 13, 18);
        this._leftArrowSprite.move(4, h/2);
        this._rightArrowSprite.bitmap = this._windowskin;
        this._rightArrowSprite.anchor.x = 0;
        this._rightArrowSprite.anchor.y = 0.5;
        this._rightArrowSprite.setFrame(154, 40, 13, 18);
        this._rightArrowSprite.move(w-17, h/2);
        Window.prototype._refreshArrows.call(this);
    };

    Window_ActorSelect.prototype._updateArrows = function() {
        this._downArrowSprite.visible = this.isOpen() && this.downArrowVisible;
        this._upArrowSprite.visible = this.isOpen() && this.upArrowVisible;
        this._leftArrowSprite.visible = this.isOpen() && this.leftArrowVisible;
        this._rightArrowSprite.visible = this.isOpen() && this.rightArrowVisible;
    };

    Window_ActorSelect.prototype.updateArrows = function() {
        var topRow = this.topRow();
        var maxTopRow = this.maxTopRow();
        this.rightArrowVisible = maxTopRow > 0 && topRow < maxTopRow;
        this.leftArrowVisible = topRow > 0;
    };

    Window_ActorSelect.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_ActorSelect.prototype.windowHeight = function() {
        return VividXP.CustomEquipScene.ActorSelectWindowHeight;
    };

    Window_ActorSelect.prototype.maxCols = function() {
        return Math.ceil(this.windowWidth() / (this.itemWidth() + (this.spacing() * 2)));
    };

    Window_ActorSelect.prototype.maxPageRows = function() {
        return 1;
    };

    Window_ActorSelect.prototype.maxItems = function() {
        return $gameParty.size();
    };

    Window_ActorSelect.prototype.itemHeight = function() {
        return VividXP.CustomEquipScene.ActorSelectItemSize;
    };

    Window_ActorSelect.prototype.itemWidth = function() {
        return VividXP.CustomEquipScene.ActorSelectItemSize;
    };

    Window_ActorSelect.prototype.loadImages = function() {
        $gameParty.members().forEach(function(actor) {
            ImageManager.reserveFace(actor.faceName());
        }, this);
    };

    Window_ActorSelect.prototype.drawItem = function(index) {
        this.drawItemImage(index);
    };

    Window_ActorSelect.prototype.drawItemImage = function(index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        var isSelected = actor === this._actor;
        this.changePaintOpacity(isSelected);
        this.drawActorFace(actor, rect.x + 1, rect.y + 1, 96, 96);
        this.changePaintOpacity(true);
    };

    Window_ActorSelect.prototype.processOk = function() {
        $gameParty.setMenuActor($gameParty.members()[this.index()]);
        Window_Selectable.prototype.processOk.call(this);
    };


    Window_ActorSelect.prototype.selectLast = function() {
        this.select($gameParty.menuActor().index() || 0);
    };

    Window_ActorSelect.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.selectLast();
        }
    };

    Window_ActorSelect.prototype.selectLast = function() {
        this.select($gameParty.menuActor().index() || 0);
    };

    Window_ActorSelect.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (this._leftEquipSlotWindow) {
            this._leftEquipSlotWindow.refresh();
        }
    };

    Window_ActorSelect.prototype.setEquipSlotWindow = function(equipSlotWindow) {
        this._leftEquipSlotWindow = equipSlotWindow;
    };

    //-------------------------------------------------------------------------
    // Window_LeftEquipSlot
    //-------------------------------------------------------------------------

    function Window_LeftEquipSlot() {
        this.initialize.apply(this, arguments);
    }

    Window_LeftEquipSlot.prototype = Object.create(Window_Selectable.prototype);
    Window_LeftEquipSlot.prototype.constructor = Window_LeftEquipSlot;

    Window_LeftEquipSlot.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this._isSwapping = false;
        this.refresh();
    };

    Window_LeftEquipSlot.prototype.activate = function() {
        Window_Selectable.prototype.activate.call(this);
        this.callHandler('activate');
    };

    Window_LeftEquipSlot.prototype.standardPadding = function() {
        return VividXP.CustomEquipScene.EquipSlotWindowPadding;
    };

    Window_LeftEquipSlot.prototype.windowWidth = function () {
        return VividXP.CustomEquipScene.EquipSlotWindowWidth;
    };

    Window_LeftEquipSlot.prototype.windowHeight = function() {
        return Graphics.boxHeight - VividXP.CustomEquipScene.ActorSelectWindowHeight - VividXP.CustomEquipScene.MenuCommandWindowHeight;
    };

    Window_LeftEquipSlot.prototype.maxRows = function( ){
        return 4;
    };

    Window_LeftEquipSlot.prototype.maxItems = function() {
        return 4;
    };

    Window_LeftEquipSlot.prototype.itemHeight = function () {
        return VividXP.CustomEquipScene.EquipSlotItemSize;
    };

    Window_LeftEquipSlot.prototype.itemWidth = function() {
        return VividXP.CustomEquipScene.EquipSlotItemSize;
    };

    Window_LeftEquipSlot.prototype.item = function() {
        return this._actor ? this._actor.equips()[this.index()] : null;
    };

    Window_LeftEquipSlot.prototype.drawItem = function(index) {
        if (this._actor) {
            this.drawItemBackground(index);
            this.drawItemIcon(index);
        }
    };

    Window_LeftEquipSlot.prototype.drawItemBackground = function(index) {
        this.itemRect(index);
    };

    Window_LeftEquipSlot.prototype.drawItemIcon = function(index) {
        var equippedItem = this._actor.equips()[index];
        if (equippedItem) {
            var rect = this.itemRect(index);
            this.changePaintOpacity(this.isEnabled(index));
            if (this._actor.equips()[index].meta.vxp) {
                var iconImg = ImageManager.loadSystem(this._actor.equips()[index].meta.vxp);
                this.contents.blt(
                    iconImg,
                    0,
                    0,
                    VividXP.CustomEquipScene.EquipSlotItemSize,
                    VividXP.CustomEquipScene.EquipSlotItemSize,
                    0,
                    0
                );
            } else {
                var iconIndex = this._actor.equips()[index].iconIndex;
                var bitmap = ImageManager.loadSystem('IconSet');
                var pw = Window_Base._iconWidth;
                var ph = Window_Base._iconHeight;
                var sx = iconIndex % 16 * pw;
                var sy = Math.floor(iconIndex / 16) * ph;
                this.contents.blt(
                    bitmap,
                    sx,
                    sy,
                    pw,
                    ph,
                    rect.x,
                    rect.y,
                    VividXP.CustomEquipScene.EquipSlotItemSize,
                    VividXP.CustomEquipScene.EquipSlotItemSize
                );
            }
            this.changePaintOpacity(true);
        }

    };

    Window_LeftEquipSlot.prototype.isEnabled = function(index) {
        return this._actor ? this._actor.isEquipChangeOk(index) : false;
    };

    Window_LeftEquipSlot.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };

    Window_LeftEquipSlot.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_LeftEquipSlot.prototype.itemRect = function(index) {
        return {
            x: 0,
            y: (index * (VividXP.CustomEquipScene.EquipSlotItemSize + VividXP.CustomEquipScene.EquipSlotWindowPadding)), //(index * 106),
            width: VividXP.CustomEquipScene.EquipSlotItemSize,
            height: VividXP.CustomEquipScene.EquipSlotItemSize
        };
    };

    Window_LeftEquipSlot.prototype.loadImages = function() {
        $gameParty.members().forEach(function(actor) {
            if (actor.equips()[0]){
                ImageManager.reserveBitmap('img/system/', actor.equips()[0].meta.vxp);
            }
        }, this);
    };

    Window_LeftEquipSlot.prototype.setItemWindow = function(itemWindow) {
        this._itemWindow = itemWindow;
    };

    Window_LeftEquipSlot.prototype.setSiblingWindow = function(equipSlotWindow) {
        this._siblingWindow = equipSlotWindow;
    };

    Window_LeftEquipSlot.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (this.active && this._itemWindow) {
            this._itemWindow.setSlotId(this.index());
        }
    };

    Window_LeftEquipSlot.prototype.cursorRight = function(wrap) {
        Input.clear();
        this.deselect();
        this.deactivate();
        this._siblingWindow.activate();
        this._siblingWindow.select(0);
    };

    Window_LeftEquipSlot.prototype.cursorLeft = function(wrap) {
        Input.clear();
        this.deselect();
        this.deactivate();
        this._siblingWindow.activate();
        this._siblingWindow.select(0);

    };

    Window_LeftEquipSlot.prototype.setStatusWindow = function(statusWindow) {
        this._statusWindow = statusWindow;
        this.callUpdateHelp();
    };

    Window_LeftEquipSlot.prototype.callUpdateHelp = function() {
        if (this.active && this._statusWindow) {
            this.updateHelp();
        }
    };

    Window_LeftEquipSlot.prototype.updateHelp = function() {
        if (this._statusWindow) {
            this._statusWindow.setTempActor(null);
        }
    };

    Window_LeftEquipSlot.prototype.processTouch = function() {
        if (this.isOpenAndActive()) {
            if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
                this._touching = true;
                this.onTouch(true);
            } else if (TouchInput.isCancelled()) {
                if (this.isCancelEnabled()) {
                    this.processCancel();
                }
            }
            if (this._touching) {
                if (TouchInput.isPressed()) {
                    this.onTouch(false);
                } else {
                    this._touching = false;
                }
            } else if (TouchInput.isTriggered() && this._siblingWindow.isTouchedInsideFrame()) {
                this.deselect();
                this.deactivate();
                this._siblingWindow.activate();
                this._siblingWindow._touching = true;
            }
        } else {
            this._touching = false;
        }
    };

    //-------------------------------------------------------------------------
    // Window_RightEquipSlot
    // Inherits from Window_LeftEquipSlot
    //-------------------------------------------------------------------------

    function Window_RightEquipSlot() {
        this.initialize.apply(this, arguments);
    }

    Window_RightEquipSlot.prototype = Object.create(Window_LeftEquipSlot.prototype);
    Window_RightEquipSlot.prototype.constructor = Window_RightEquipSlot;

    Window_RightEquipSlot.prototype.item = function() {
        return this._actor ? this._actor.equips()[this.index() + 4] : null;
    };

    Window_RightEquipSlot.prototype.drawItemIcon = function(index) {
        var equippedItem = this._actor.equips()[index+4];
        if (equippedItem) {
            var rect = this.itemRect(index);
            this.changePaintOpacity(this.isEnabled(index+4));

            if (this._actor.equips()[index+4].meta.vxp) {
                var iconImg = ImageManager.loadSystem(this._actor.equips()[index+4].meta.vxp);
                this.contents.blt(
                    iconImg,
                    0,
                    0,
                    VividXP.CustomEquipScene.EquipSlotItemSize,
                    VividXP.CustomEquipScene.EquipSlotItemSize,
                    0,
                    0
                );
            } else {
                var iconIndex = this._actor.equips()[index+4].iconIndex;
                var bitmap = ImageManager.loadSystem('IconSet');
                var pw = Window_Base._iconWidth;
                var ph = Window_Base._iconHeight;
                var sx = iconIndex % 16 * pw;
                var sy = Math.floor(iconIndex / 16) * ph;
                this.contents.blt(
                    bitmap,
                    sx,
                    sy,
                    pw,
                    ph,
                    rect.x,
                    rect.y,
                    VividXP.CustomEquipScene.EquipSlotItemSize,
                    VividXP.CustomEquipScene.EquipSlotItemSize
                );
            }
            this.changePaintOpacity(true);
        }

    };

    Window_RightEquipSlot.prototype.isEnabled = function(index) {
        return this._actor ? this._actor.isEquipChangeOk(index+4) : false;
    };

    Window_RightEquipSlot.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index()+4);
    };

    Window_RightEquipSlot.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (this.active && this._itemWindow) {
            this._itemWindow.setSlotId(this.index()+4);
        }
    };

    //-------------------------------------------------------------------------
    // Window_CustomEquipItemHelp
    //-------------------------------------------------------------------------

    function Window_CustomEquipItemHelp() {
        this.initialize.apply(this, arguments);
    }

    Window_CustomEquipItemHelp.prototype = Object.create(Window_Help.prototype);
    Window_CustomEquipItemHelp.prototype.constructor = Window_CustomEquipItemHelp;

    Window_CustomEquipItemHelp.prototype.initialize = function(x, y, width, numLines) {
        var height = this.fittingHeight(numLines || 2);
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._text = '';
        this.openness = 0;
    };

    //-------------------------------------------------------------------------
    // Window_CustomEquipItemList
    //-------------------------------------------------------------------------
    function Window_CustomEquipItemList() {
        this.initialize.apply(this, arguments);
    }

    Window_CustomEquipItemList.prototype = Object.create(Window_EquipItem.prototype);
    Window_CustomEquipItemList.prototype.constructor= Window_CustomEquipItemList;

    Window_CustomEquipItemList.prototype.initialize = function(x, y, width, height) {
        Window_EquipItem.prototype.initialize.call(this, x, y, width, height);
        this.openness = 0;
    };

    //-------------------------------------------------------------------------
    // Window_ActorBust
    //-------------------------------------------------------------------------

    function Window_ActorBust() {
        this.initialize.apply(this, arguments);
    }

    Window_ActorBust.prototype = Object.create(Window_Base.prototype);
    Window_ActorBust.prototype.constructor = Window_ActorBust;

    Window_ActorBust.prototype.initialize = function(x, y, width, height) {
        this._windowWidth = width;
        this._windowHeight = height;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this.refresh();
    };

    Window_ActorBust.prototype.windowWidth = function() {
        return this._windowWidth;
    };

    Window_ActorBust.prototype.windowHeight = function() {
        return this._windowHeight;
    };

    Window_ActorBust.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();

        }
    };

    Window_ActorBust.prototype.drawBust = function() {
        if (this._actor){
            this.changePaintOpacity(true);
            var imgLoc = $dataActors[this._actor._actorId].meta.vxp;
            var bustImg = ImageManager.loadPicture(imgLoc);
            this.contents.blt(
                bustImg,
                0,
                0,
                VividXP.CustomEquipScene.ActorBustImageWidth,
                VividXP.CustomEquipScene.ActorBustImageHeight,
                0,
                0
            );

            this.changePaintOpacity(true);
        }
    };

    Window_ActorBust.prototype.loadImages = function() {
        $gameParty.members().forEach(function(actor) {
            ImageManager.reservePicture($dataActors[actor._actorId].meta.vxp);
        }, this);
    };

    Window_ActorBust.prototype.refresh = function() {
        if (this.contents) {
            this.contents.clear();
            this.drawBust();
        }
    };

    //-------------------------------------------------------------------------
    // Window_CustomMenuCommand
    // Second row, left, allows selection of equip slot
    //-------------------------------------------------------------------------

    function Window_CustomMenuCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_CustomMenuCommand.prototype = Object.create(Window_MenuCommand.prototype);
    Window_CustomMenuCommand.prototype.constructor = Window_CustomMenuCommand;

    Window_CustomMenuCommand.prototype.initialize = function(x, y, width, height) {
        this.clearCommandList();
        this.makeCommandList();
        this._windowWidth = width;
        this._windowHeight = height;
        Window_Selectable.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
        this.refresh();
        this.selectLast();
    };

    Window_CustomMenuCommand.prototype.windowWidth = function() {
        return this._windowWidth;
    };

    Window_CustomMenuCommand.prototype.windowHeight = function () {
        return this._windowHeight;
    };

    Window_CustomMenuCommand.prototype.standardPadding = function() {
        return VividXP.CustomEquipScene.MenuCommandWindowPadding;
    };

    Window_CustomMenuCommand.prototype.maxItems = function() {
        return this._list.length;
    };

    Window_CustomMenuCommand.prototype.itemHeight = function( ){
        return VividXP.CustomEquipScene.MenuCommandItemSize;
    };

    Window_CustomMenuCommand.prototype.maxCols = function() {
        var numCols;
        switch(VividXP.CustomEquipScene.MenuCommandItemType) {
            case 'icons':
                numCols = VividXP.CustomEquipScene.MenuCommandNumItems;
            break;

            case 'text':
            default:
                numCols = 5;
            break;
        }
        return numCols;
    };

    Window_CustomMenuCommand.prototype.processTouch = function() {
        Window_Selectable.prototype.processTouch.call(this);
        if (!this.isOpenAndActive() && this.isTouchedInsideFrame()) {
            this._touching = true;
            this.activate();
            this.onTouch(true);
            this.callHandler('activate');
        }
    };

    Window_CustomMenuCommand.prototype.drawItem = function(index) {
        switch (VividXP.CustomEquipScene.MenuCommandItemType) {
            case 'icons':
                this.drawItemIcon(index);
            break;

            case 'text':
            default:
                Window_MenuCommand.prototype.drawItem.call(this, index);
            break;
        }
    };

    Window_CustomMenuCommand.prototype.drawItemIcon = function(index) {
        var rect = this.itemRect(index);
        var bitmap = ImageManager.loadSystem(VividXP.CustomEquipScene.MenuCommandIconFile);
        var pw = VividXP.CustomEquipScene.MenuCommandItemSize;
        var ph = VividXP.CustomEquipScene.MenuCommandItemSize;
        var sx = index % VividXP.CustomEquipScene.MenuCommandNumItems * pw;
        var sy = 0;
        var rectX = ((rect.width - VividXP.CustomEquipScene.MenuCommandItemSize) / 2) + rect.x;
        this.contents.blt(bitmap, sx, sy, pw, ph, rectX, rect.y);
    };

    Window_CustomMenuCommand.prototype.loadImages = function() {
        ImageManager.reserveBitmap('img/system/', VividXP.CustomEquipScene.MenuCommandIconFile);
    };

    Window_CustomMenuCommand.prototype._createAllParts = function() {
        Window.prototype._createAllParts.call(this);
        this._leftArrowSprite = new Sprite();
        this._rightArrowSprite = new Sprite();
        this.addChild(this._leftArrowSprite);
        this.addChild(this._rightArrowSprite);
    };

    Window_CustomMenuCommand.prototype._refreshArrows = function() {
        var w = this._width;
        var h = this._height;
        this._leftArrowSprite.bitmap = this._windowskin;
        this._leftArrowSprite.bitmap = this._windowskin;
        this._leftArrowSprite.anchor.x = 0;
        this._leftArrowSprite.anchor.y = 0.5;
        this._leftArrowSprite.setFrame(120, 40, 13, 18);
        this._leftArrowSprite.move(4, h/2);
        this._rightArrowSprite.bitmap = this._windowskin;
        this._rightArrowSprite.anchor.x = 0;
        this._rightArrowSprite.anchor.y = 0.5;
        this._rightArrowSprite.setFrame(154, 40, 13, 18);
        this._rightArrowSprite.move(w-17, h/2);
        Window.prototype._refreshArrows.call(this);
    };

    Window_CustomMenuCommand.prototype._updateArrows = function() {
        this._downArrowSprite.visible = this.isOpen() && this.downArrowVisible;
        this._upArrowSprite.visible = this.isOpen() && this.upArrowVisible;
        this._leftArrowSprite.visible = this.isOpen() && this.leftArrowVisible;
        this._rightArrowSprite.visible = this.isOpen() && this.rightArrowVisible;
    };

    Window_CustomMenuCommand.prototype.updateArrows = function() {
        var topRow = this.topRow();
        var maxTopRow = this.maxTopRow();
        this.rightArrowVisible = maxTopRow > 0 && topRow < maxTopRow;
        this.leftArrowVisible = topRow > 0;
    };

    Window_CustomMenuCommand.prototype.makeCommandList = function() {
        this.addMainCommands();
        this.addOriginalCommands();
        this.addOptionsCommand();
        this.addSaveCommand();
        this.addGameEndCommand();
    };

    Window_CustomMenuCommand.prototype.addOriginalCommands = function() {
        /* example
        if (this.needsCommand('equip')) {
            this.addCommand(TextManager.equip, 'equip', enabled);
        }
        */
    };



    //-------------------------------------------------------------------------
    // Window_CustomEquipStatus
    //-------------------------------------------------------------------------
    function Window_CustomEquipStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_CustomEquipStatus.prototype = Object.create(Window_EquipStatus.prototype);
    Window_CustomEquipStatus.prototype.constructor = Window_CustomEquipStatus;

    Window_CustomEquipStatus.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this._tempActor = null;
        this.refresh();
    };

    Window_CustomEquipStatus.prototype.windowWidth = function(){
        return Graphics.boxWidth - (VividXP.CustomEquipScene.EquipSlotWindowWidth * 2);
    };

    Window_CustomEquipStatus.prototype.windowHeight = function() {
        return VividXP.CustomEquipScene.EquipStatusWindowHeight;
    };

    Window_CustomEquipStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            for (var i = 0; i < 6; i++) {
                var ix;
                var iy;
                if (i > 3) {
                    ix = (this.windowWidth()/2) - this.standardFontSize(); //346;
                    iy = this.lineHeight() * (i - 4);
                } else {
                    ix = 0;
                    iy = this.lineHeight() * i;
                }
                this.drawItem(ix, iy, 2 + i);
            }
        }
    };

    Window_CustomEquipStatus.prototype.numVisibleRows = function() {
        return 4;
    };

    Window_CustomEquipStatus.prototype.lineHeight = function() {
        return VividXP.CustomEquipScene.EquipStatusLineHeight;
    };

    Window_CustomEquipStatus.prototype.standardFontSize = function() {
        return VividXP.CustomEquipScene.EquipStatusFontSize;
    };

    Window_CustomEquipStatus.prototype.textPadding = function() {
        return VividXP.CustomEquipScene.EquipStatusTextPadding;
    };

})();
