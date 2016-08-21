BEM.DOM.decl("b-keyboard", {
    onSetMod: {
        js: function() {
            Lego.block["b-keyboard"].call(this.domElem, this.params)
        }
    }
}),
function(e) {
    var t = BEM.blocks["i-global"];
    Lego.block["b-keyboard"] = function(e) {
        return new Lego.block["b-keyboard"].Keyboard(this,e)
    }
    ,
    Lego.block["b-keyboard"].lang = {};
    var a = Lego.block["b-keyboard"].Keyboard = function(e, t) {
        this.initialize(e, t)
    }
    ;
    a.prototype = {
        rowsLayout: [14, 15, 14, 13],
        KEY_BLOCK: "b-keyboard__key",
        KEY_ENTER: "b-keyboard__key_special-enter",
        targetField: null ,
        hold: !1,
        holdInterval: null ,
        holdDelay: 0,
        clearHold: function() {
            this.hold = !1,
            this.holdDelay = 0,
            clearInterval(this.holdInterval)
        },
        unescapeHTMLRe: /(&(lt|gt|quot|apos|amp|#\d+);|.)/gi,
        unescapeHTMLHash: {
            lt: "<",
            gt: ">",
            quot: '"',
            apos: "'",
            amp: "&"
        },
        initialize: function(a, l) {
            if (this.elem = a,
            this.params = l,
            !this.targetField && l["for"] && (this.targetField = e(l["for"])[0]),
            l.fake !== !1)
                return a.remove(),
                void Lego.blockInit(e("body"), ".b-keyboard");
            if (a[0].onmousedown = function() {
                return !1
            }
            ,
            a[0].onselectstart = function() {
                return !1
            }
            ,
            l.fake === !1) {
                var s;
                try {
                    s = window.location.hostname.match(/.(ru|ua|by|kz)$/)
                } catch (p) {
                    s = ["", "en"]
                }
                this.attachEventsOnce(),
                a.data("accent", "normal"),
                this.language(l.lang || t.param("locale") || s && s[1] || "en"),
                this.modality("normal", !1)
            }
            var c = this;
            e(window).bind("keyboardSetLang.lego", function(t, a) {
                var l = e(".b-keyboard__lang-" + a).get(0);
                l && c.switchLayout(l)
            })
        },
        language: function(e) {
            var t = {
                be: "by",
                kk: "kz",
                uk: "ua"
            };
            e = t[e] || e,
            this.elem.data("lang", Lego.block["b-keyboard"].lang[e])
        },
        modality: function(e, t) {
            var a = e.indexOf("accent_") > -1 && e.split("_")[1]
              , l = this.elem;
            a ? (a = l.data("accent") === a ? "normal" : a,
            e = l.data("modality") || "normal",
            t = l.data("capslock") || !1) : (a = l.data("accent") || "normal",
            e = l.data("modality") === e ? "normal" : e,
            t = t || !1),
            l.data("langModality", l.data("lang")[e]).data("modality", e).data("capslock", t).data("accent", a).html(this.rows()),
            this.initBlock(),
            this.markLayout(e, a),
            this.attachEvents()
        },
        initBlock: function() {
            BEM.DOM.init(this.elem)
        },
        rows: function() {
            for (var e = "", t = 0, a = 0; a < this.rowsLayout.length; a++) {
                var l = parseInt(this.rowsLayout[a], 10);
                e += '<table class="b-keyboard__row"><tr>' + this.keys(t, l) + "</tr></table>",
                t += l
            }
            return e += this.bottomRow()
        },
        keys: function(e, t) {
            for (var a = "", l = e; e + t > l; l++)
                a += this.key(l);
            return a
        },
        key: function(e) {
            var a = this.elem
              , l = a.data("langModality").specialKeys || a.data("lang").specialKeys
              , s = l[e + 1]
              , p = s ? " " + this.KEY_BLOCK + "_special-" + s.type : ""
              , c = s ? s.label : a.data("langModality").keys.charAt(e)
              , i = a.data("accent")
              , o = i && a.data("langModality").accents ? a.data("langModality").accents[i] : null ;
            return s && s.type.indexOf("accent") > -1 && (p += " " + this.KEY_MARKED),
            o && !s && (o[e + 1] ? c = o[e + 1].label : p += " " + this.KEY_DISABLED),
            "shift" !== c && "capslock" !== c && "enter" !== c && "ua" !== c || (c = '<img class="b-keyboard__key__image" src="' + t.param("lego-static-host") + "/blocks-desktop/b-keyboard/key/b-keyboard__key." + c + '.png" alt="' + c + '"/>'),
            "alt" != c && "ru" != c || (c = '<img class="b-keyboard__key__image" src="' + t.param("lego-static-host") + "/blocks-desktop/b-keyboard/key/b-keyboard__key." + c + '.png" alt="' + c + '"/>'),
            "Sch" === c && a.data("capslock") && (c = "SCH"),
            "\x00" === c && (c = ""),
            '<td class="b-keyboard__row__cell"><span class="' + this.KEY_BLOCK + p + '"><span class="' + this.KEY_BLOCK + '-m">' + c + "</span></span></td>"
        },
        bottomRow: function() {
            return '<table class="b-keyboard__row"><tr><td class="b-keyboard__row__cell">' + this.langSelector() + '</td><td class="b-keyboard__row__cell"><span class="b-keyboard__key b-keyboard__key_special-space"><span class="b-keyboard__key-m"> </span></span></td><td class="b-keyboard__row__cell"><span class="b-keyboard__key b-keyboard__key_special-alt b-keyboard__key_state_marked"><span class="b-keyboard__key-m">« » { } ~</span></span></td></tr></table>'
        },
        langSelector: function() {
            var e = this.elem.data("lang").id;
            return '<div class="b-keyboard__lang-selector"><div class="b-keyboard__lang-i b-keyboard__key_state_marked"><div class="dropdown-menu dropdown i-bem" data-bem="{&quot;dropdown-menu&quot;:{}}"><span class="b-link b-link_pseudo_yes dropdown-menu__switcher b-keyboard__switcher i-bem b-keyboard__lang-' + e + '"><i class="b-keyboard__lang-ic"></i>' + Lego.block["b-keyboard"].lang[e].label + '</span><div class="i-bem b-keyboard__popup popup popup_theme_ffffff popup_autoclosable_yes popup_adaptive_yes popup_position_fixed popup_animate_no dropdown__popup dropdown-menu__popup" data-bem="{&quot;popup&quot;:{&quot;disableoutside&quot;:&quot;yes&quot;,&quot;directions&quot;:{&quot;to&quot;:&quot;top&quot;,&quot;axis&quot;:&quot;left&quot;,&quot;offset&quot;:{&quot;top&quot;:-4}}}}"><div class="popup__under"></div><div class="popup__content"><div class="b-menu-vert b-keyboard__langs dropdown-menu__menu dropdown-menu__menu_type_hovered dropdown-menu__menu_theme_ffffff i-bem" role="menu" data-bem="{&quot;b-menu-vert&quot;:{}}"><ul class="b-menu-vert__layout">' + this.langItems() + "</ul></div></div></div></div></div>"
        },
        langItems: function() {
            var a = this.elem.data("lang").id
              , l = ["by", "en", "fr", "de", "id", "it", "kz", "es", "ru", "tt", "tr", "ua"]
              , s = e.inArray(t.param("locale"), l)
              , p = "";
            -1 !== s && l.unshift(l.splice(s, 1)[0]);
            for (var c = 0; c < l.length; c++) {
                var i = l[c]
                  , o = Lego.block["b-keyboard"].lang[i].label;
                p += '<li class="b-menu-vert__item b-menu-vert__layout-unit b-menu-vert__item-selector b-keyboard__lang b-keyboard__lang-' + i + (i === a ? " b-menu-vert__item_state_current" : "") + '" role="menuitem"><span class="link link_pseudo_yes b-lang-switcher__lang b-keyboard__lang"><i class="b-keyboard__lang-ic"></i>' + o + '<i class="b-keyboard__lang-tick"></i></span></li>'
            }
            return p
        },
        _isSpesialKey: function(e) {
            return e.className.match(/b-keyboard__key_special-(\w+)/)
        },
        handleKey: function(t) {
            var a = this._isSpesialKey(t);
            return a ? this.handleSpecialKey(t, a[1]) : this.handleNormalKey(t),
            this.targetField && e(this.targetField).keydown(),
            a ? a[1] : null
        },
        finalizeKey: function(e) {
            this._isSpesialKey(e) || this.finalizeNormalKey(e)
        },
        finalizeNormalKey: function(e) {
            var t = this;
            "shift" === this.elem.data("modality") && this.elem.data("capslock") === !1 && window.setTimeout(function() {
                t.modality("normal", !1)
            }, 1)
        },
        handleNormalKey: function(t, a) {
            var l = this
              , s = this.elem
              , p = this.targetField;
            if (t && p) {
                var c = e(t);
                if (c.hasClass(this.KEY_DISABLED))
                    return;
                var i = c.find("." + this.KEY_BLOCK + "-m").html().replace(this.unescapeHTMLRe, function(e, t, a) {
                    return l.unescapeHTMLHash[a] || (a ? String.fromCharCode(a.substring(1)) : t)
                })
                  , o = e(p);
                if ("backspace" !== a) {
                    if ("enter" === a) {
                        if ("input" === p.tagName.toLowerCase()) {
                            try {
                                e(p.form).submit()
                            } catch (b) {}
                            return
                        }
                        i = "\n"
                    }
                    "space" === a && (i = " "),
                    "hryvna" === a && (i = "₴"),
                    "rub" == a && (i = "₽"),
                    o.insertAtCaretPos(i)
                } else
                    o.deleteAtCaretPos()
            }
            "normal" !== s.data("accent").toString() && this.modality("accent_normal", !1)
        },
        handleSpecialKey: function(e, t) {
            switch (t) {
            case "lshift":
            case "rshift":
                this.modality("shift", !1);
                break;
            case "capslock":
                this.modality("shift", !0);
                break;
            case "alt":
                this.modality("alt", !1);
                break;
            case "accent_circumflex":
            case "accent_umlaut":
            case "accent_grave":
            case "accent_acute":
            case "accent_mod":
                this.modality(t, !1);
                break;
            case "hryvna":
            case "rub":
            case "backspace":
            case "atmark":
            case "enter":
            default:
                this.handleNormalKey(e, t)
            }
        },
        markLayout: function(t, a) {
            "alt" === t && e("." + this.KEY_BLOCK + "_special-alt").addClass(this.KEY_SUPPRESSED),
            "shift" === t && (this.elem.data("capslock") === !0 ? e("." + this.KEY_BLOCK + "_special-capslock").addClass(this.KEY_SUPPRESSED) : (e("." + this.KEY_BLOCK + "_special-lshift").addClass(this.KEY_SUPPRESSED),
            e("." + this.KEY_BLOCK + "_special-rshift").addClass(this.KEY_SUPPRESSED))),
            a && e("." + this.KEY_BLOCK + "_special-accent_" + a).addClass(this.KEY_SUPPRESSED)
        },
        switchLayout: function(t) {
            var a = t.className.match(/b-keyboard__lang-(\w+)/)
              , l = this.elem;
            a && (this.language(a[1]),
            l.data("accent", "normal"),
            this.modality("normal", !1),
            l.click(),
            e(window).trigger("keyboardLangChanged.lego", [a[1]]))
        },
        _isTextInput: function(e) {
            return e && e.tagName || (e = this),
            /^input$/i.test(e.tagName) && !!~["text", "search", "password"].indexOf(e.type) || /^textarea$/i.test(e.tagName)
        },
        attachEventsOnce: function() {
            var t = this
              , a = this.elem;
            a.on("click", "." + this.KEY_BLOCK, function() {
                return e(this).hasClass(t.KEY_ENTER) ? t.handleKey(this) : t.targetField && e(t.targetField).keypress(),
                !1
            }).on("mousedown", "." + this.KEY_BLOCK, function(a) {
                if (a.which && 1 !== a.which || a.button && 1 !== a.button)
                    return !1;
                if (e(this).hasClass(t.KEY_DISABLED) || e(this).addClass(t.KEY_PRESSED).data("pressed", 1),
                !e(this).hasClass(t.KEY_ENTER)) {
                    var l = t.handleKey(this)
                      , s = this
                      , p = ["atmark", "backspace", "space"];
                    l && !~p.indexOf(l) || (t.hold = !0,
                    t.holdInterval = window.setInterval(function() {
                        t.hold === !0 && (t.holdDelay < 3 ? t.holdDelay++ : t.handleKey(s))
                    }, 100))
                }
            }).on("mouseup", "." + this.KEY_BLOCK, function() {
                t.clearHold(),
                t.finalizeKey(this),
                e(this).removeClass(t.KEY_PRESSED).data("pressed", 0),
                t.targetField && e(t.targetField).keyup()
            }),
            a.click(function(a) {
                t.targetField && !e(a.target).is("." + t.KEY_BLOCK) && e(t.targetField).setCaretPos()
            });
            var l, s = e(document), p = e(document.body), c = e("input, textarea").filter(this._isTextInput).filter(":visible"), i = this._onClickOrFocus.bind(this);
            this._blockFocus = !1,
            p.bind("mouseup", i),
            s.on("focus", "input", i),
            p.bind("keyup", function(a) {
                var l = a.target;
                return t._isTextInput(l) ? void (t.targetField && a.keyCode && e(t.targetField).saveCaretPos()) : !1
            }),
            e.browser && e.browser.msie && p.bind("keyup change", function(a) {
                return t._isTextInput(a.target) ? void ("change" !== a.type && a.keyCode || (l && window.clearTimeout(l),
                t._blockFocus = !0,
                l = window.setTimeout(function() {
                    e(t.targetField).setCaretPos(),
                    l = null
                }, 10))) : !1
            }),
            c.each(function() {
                var a = e(this);
                return a.saveCaretPos(),
                a.data("lego:focused") && (t.targetField = this),
                !1
            })
        },
        _onClickOrFocus: function(t) {
            var a = t.target;
            return this._isTextInput(a) ? this._blockFocus && "focusin" === t.type ? (this._blockFocus = !1,
            !1) : (this.targetField = a,
            Lego.block["b-keyboard"]._lastFocusedIn = a,
            void ("focusin" === t.type && t.target === t.srcElement ? e(a).setCaretPos(a.value.length) : setTimeout(function() {
                e(a).saveCaretPos()
            }, 50))) : !1
        },
        attachEvents: function() {
            var e = this
              , t = e.elem;
            t.find(".b-menu-vert").bem("b-menu-vert").on("current", function(t, a) {
                e.switchLayout(a.current[0])
            }),
            t.find("." + this.KEY_BLOCK).bind("mouseleave", function() {
                var t = jQuery(this);
                1 === t.data("pressed") && t.removeClass(e.KEY_PRESSED),
                e.clearHold()
            })
        },
        getDefaultLanguage: function(e) {
            var a;
            try {
                a = window.location.hostname.match(/.(ru|ua|by|kz)$/)
            } catch (l) {
                a = ["", "en"]
            }
            this.attachEventsOnce(),
            this.elem.data("accent", "normal"),
            this.language(this.params.lang || t.param("locale") || a && a[1] || "en"),
            this.modality("normal", !1)
        }
    },
    a.prototype.KEY_STATE = a.prototype.KEY_BLOCK + "_state_",
    a.prototype.KEY_PRESSED = a.prototype.KEY_STATE + "pressed",
    a.prototype.KEY_SUPPRESSED = a.prototype.KEY_STATE + "suppressed",
    a.prototype.KEY_MARKED = a.prototype.KEY_STATE + "marked",
    a.prototype.KEY_DISABLED = a.prototype.KEY_STATE + "disabled"
}(jQuery),
jQuery.fn.extend({
    saveCaretPos: function() {
        var e, t, a, l = this.get(0);
        if ("value"in l)
            if ("selectionStart"in l)
                e = l.selectionStart,
                t = l.selectionEnd;
            else if (l.createTextRange)
                if ("TEXTAREA" === l.tagName) {
                    a = document.selection.createRange();
                    var s = a.duplicate();
                    s.moveToElementText(l),
                    s.setEndPoint("EndToEnd", a),
                    e = s.text.length - a.text.length,
                    t = e + a.text.length
                } else
                    a = document.selection.createRange().duplicate(),
                    a.moveEnd("character", l.value.length),
                    e = "" === a.text ? l.value.length : l.value.lastIndexOf(a.text),
                    a = document.selection.createRange().duplicate(),
                    a.moveStart("character", -l.value.length),
                    t = a.text.length;
            else
                e = t = l.value.length;
        else
            e = t = 0;
        e >= 0 && t >= 0 && this.data("selection", {
            start: e,
            end: t
        })
    },
    setCaretPos: function(e) {
        var t = this.get(0);
        if (e >= 0)
            this.data("selection", {
                start: e,
                end: e
            });
        else {
            if (e = this.data("selection"),
            !e)
                return;
            e = e.start
        }
        if (t.createTextRange) {
            var a = t.createTextRange();
            a.collapse(!0),
            a.moveEnd("character", e),
            a.moveStart("character", e),
            a.select()
        } else
            t.setSelectionRange && (t.focus(),
            t.setSelectionRange(e, e))
    },
    insertAtCaretPos: function(e) {
        var t = this.data("selection")
          , a = this.get(0);
        t || ($(a).saveCaretPos(),
        t = this.data("selection"));
        var l = t.start + e.length;
        try {
            var s = document.createEvent("TextEvent");
            s.initTextEvent("textInput", !0, !0, null , e, 9),
            this.focus().get(0).dispatchEvent(s)
        } catch (p) {
            a.value = a.value.substring(0, t.start) + e + a.value.substring(t.end)
        }
        jQuery.browser && jQuery.browser.msie ? this.data("selection", {
            start: l,
            end: l
        }) : this.setCaretPos(l)
    },
    deleteAtCaretPos: function() {
        var e, t = this.data("selection"), a = this.get(0);
        t.start === t.end ? (a.value = a.value.substring(0, t.start - 1) + a.value.substring(t.end),
        e = t.start - 1,
        0 > e && (e = 0)) : (a.value = a.value.substring(0, t.start) + a.value.substring(t.end),
        e = t.start),
        jQuery.browser && jQuery.browser.msie ? this.data("selection", {
            start: e,
            end: e
        }) : this.setCaretPos(e)
    }
}),
Lego.block["b-keyboard"].lang.en = {
    id: "en",
    label: "English",
    normal: {
        keys: "`1234567890-=\x00@qwertyuiop[]\\“\x00asdfghjkl;'!\x00\nzxcvbnm,.:/\x00"
    },
    shift: {
        keys: '~!@#$%^&*()_+\x00@QWERTYUIOP{}|”\x00ASDFGHJKL:"?\x00\nZXCVBNM<>;—\x00'
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£μ\x00@~§¶:;\x00'\"«»[]{}\x00\x00\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00"
    },
    specialKeys: {
        14: {
            type: "backspace",
            label: "←"
        },
        15: {
            type: "atmark",
            label: "@"
        },
        30: {
            type: "capslock",
            label: "capslock"
        },
        43: {
            type: "enter",
            label: "enter"
        },
        44: {
            type: "lshift",
            label: "shift"
        },
        56: {
            type: "rshift",
            label: "shift"
        }
    }
},
Lego.block["b-keyboard"].lang.de = {
    id: "de",
    label: "Deutsch",
    normal: {
        keys: "`1234567890-=\x00@qwertyuiopüä\\«\x00asdfghjkl;ö!\x00\nzxcvbnm,.ß\x00\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            55: {
                type: "sch",
                label: "sch"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        }
    },
    shift: {
        keys: "~!@#$%^&*()_+\x00@QWERTYUIOPÜÄ/»\x00ASDFGHJKL:Ö?\x00\nZXCVBNM<>;\x00\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            55: {
                type: "sch",
                label: "Sch"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        }
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£μ\x00@~§¶:;\x00'\"«»[]{}\x00\x00\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        }
    }
},
Lego.block["b-keyboard"].lang.fr = {
    id: "fr",
    label: "Français",
    normal: {
        keys: "`1234567890-=\x00@qwertyuiop^¨é!\x00asdfghjkl;`'\x00\nzxcvbnm,.çœ\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            26: {
                type: "accent_circumflex",
                label: "^"
            },
            27: {
                type: "accent_umlaut",
                label: "¨"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            41: {
                type: "accent_grave",
                label: "`"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            circumflex: {
                18: {
                    type: "e",
                    label: "ê"
                },
                22: {
                    type: "u",
                    label: "û"
                },
                23: {
                    type: "i",
                    label: "î"
                },
                24: {
                    type: "o",
                    label: "ô"
                },
                31: {
                    type: "a",
                    label: "â"
                }
            },
            umlaut: {
                18: {
                    type: "e",
                    label: "ë"
                },
                21: {
                    type: "y",
                    label: "ÿ"
                },
                22: {
                    type: "u",
                    label: "ü"
                },
                23: {
                    type: "i",
                    label: "ï"
                }
            },
            grave: {
                18: {
                    type: "e",
                    label: "è"
                },
                22: {
                    type: "u",
                    label: "ù"
                },
                31: {
                    type: "a",
                    label: "à"
                }
            }
        }
    },
    shift: {
        keys: '~!@#$%?&*()_+\x00@QWERTYUIOP^¨É?\x00ASDFGHJKL:`"\x00\nZXCVBNM<>ÇŒ\x00',
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            26: {
                type: "accent_circumflex",
                label: "^"
            },
            27: {
                type: "accent_umlaut",
                label: "¨"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            41: {
                type: "accent_grave",
                label: "`"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            circumflex: {
                18: {
                    type: "E",
                    label: "Ê"
                },
                22: {
                    type: "U",
                    label: "Û"
                },
                23: {
                    type: "I",
                    label: "Î"
                },
                24: {
                    type: "O",
                    label: "Ô"
                },
                31: {
                    type: "A",
                    label: "Â"
                }
            },
            umlaut: {
                18: {
                    type: "E",
                    label: "Ë"
                },
                21: {
                    type: "Y",
                    label: "Ÿ"
                },
                22: {
                    type: "U",
                    label: "Ü"
                },
                23: {
                    type: "I",
                    label: "Ï"
                }
            },
            grave: {
                18: {
                    type: "E",
                    label: "È"
                },
                22: {
                    type: "U",
                    label: "Ù"
                },
                31: {
                    type: "A",
                    label: "À"
                }
            }
        }
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£μ\x00@~§¶:;\x00'\"«»[]{}\x00\x00\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            41: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        }
    }
},
Lego.block["b-keyboard"].lang.it = {
    id: "it",
    label: "Italiano",
    normal: {
        keys: "`1234567890-=\x00@qwertyuiop`´—«\x00asdfghjkl;'!\x00\nzxcvbnm,.:/\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            26: {
                type: "accent_grave",
                label: "`"
            },
            27: {
                type: "accent_acute",
                label: "´"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            grave: {
                18: {
                    type: "e",
                    label: "è"
                },
                22: {
                    type: "u",
                    label: "ù"
                },
                23: {
                    type: "i",
                    label: "ì"
                },
                24: {
                    type: "o",
                    label: "ò"
                },
                31: {
                    type: "a",
                    label: "à"
                }
            },
            acute: {
                18: {
                    type: "e",
                    label: "é"
                },
                22: {
                    type: "u",
                    label: "ú"
                },
                23: {
                    type: "i",
                    label: "í"
                },
                24: {
                    type: "o",
                    label: "ó"
                },
                31: {
                    type: "a",
                    label: "á"
                }
            }
        }
    },
    shift: {
        keys: '~!@#$%^&*()_+\x00@QWERTYUIOP`´|»\x00ASDFGHJKL:"?\x00\nZXCVBNM<>;\\\x00',
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            26: {
                type: "accent_grave",
                label: "`"
            },
            27: {
                type: "accent_acute",
                label: "´"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            grave: {
                18: {
                    type: "E",
                    label: "È"
                },
                22: {
                    type: "U",
                    label: "Ù"
                },
                23: {
                    type: "I",
                    label: "Ì"
                },
                24: {
                    type: "O",
                    label: "Ò"
                },
                31: {
                    type: "A",
                    label: "À"
                }
            },
            acute: {
                18: {
                    type: "E",
                    label: "É"
                },
                22: {
                    type: "U",
                    label: "Ú"
                },
                23: {
                    type: "I",
                    label: "Í"
                },
                24: {
                    type: "O",
                    label: "Ó"
                },
                31: {
                    type: "A",
                    label: "Á"
                }
            }
        }
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£μ\x00@~§¶:;\x00'\"«»[]{}\x00\x00\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        }
    }
},
Lego.block["b-keyboard"].lang.es = {
    id: "es",
    label: "Español",
    normal: {
        keys: "\\1234567890-=\x00@qwertyuiopü´\\“\x00asdfghjkl;ñ—\x00\nzxcvbnm,.?!\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            27: {
                type: "accent_acute",
                label: "´"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            acute: {
                18: {
                    type: "e",
                    label: "é"
                },
                22: {
                    type: "u",
                    label: "ú"
                },
                23: {
                    type: "i",
                    label: "í"
                },
                24: {
                    type: "o",
                    label: "ó"
                },
                31: {
                    type: "a",
                    label: "á"
                }
            }
        }
    },
    shift: {
        keys: "~!@#$%^&*()_+\x00@QWERTYUIOPÜ´/”\x00ASDFGHJKL:Ñ|\x00\nZXCVBNM<>¿¡\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            27: {
                type: "accent_acute",
                label: "´"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            acute: {
                18: {
                    type: "E",
                    label: "É"
                },
                22: {
                    type: "U",
                    label: "Ú"
                },
                23: {
                    type: "I",
                    label: "Í"
                },
                24: {
                    type: "O",
                    label: "Ó"
                },
                31: {
                    type: "A",
                    label: "Á"
                }
            }
        }
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£μ\x00@~§¶:;\x00'\"«»[]{}\x00\x00\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        }
    }
},
Lego.block["b-keyboard"].lang.ua = {
    id: "ua",
    label: "Українська",
    normal: {
        keys: "'1234567890-=\x00@йцукенгшщзхї\\!\x00фівапролджєґ\x00\nячсмитьбю,.\x00"
    },
    shift: {
        keys: "\x00!@№$%?&*()_+\x00@ЙЦУКЕНГШЩЗХЇ/?\x00ФІВАПРОЛДЖЄҐ\x00\nЯЧСМИТЬБЮ;:\x00",
        specialKeys: {
            1: {
                type: "hryvna",
                label: "ua"
            },
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        }
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£μ\x00@~§¶:;\x00'\"«»[]{}\x00\x00\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00"
    },
    specialKeys: {
        14: {
            type: "backspace",
            label: "←"
        },
        15: {
            type: "atmark",
            label: "@"
        },
        30: {
            type: "capslock",
            label: "capslock"
        },
        43: {
            type: "enter",
            label: "enter"
        },
        44: {
            type: "lshift",
            label: "shift"
        },
        56: {
            type: "rshift",
            label: "shift"
        }
    }
},
Lego.block["b-keyboard"].lang.ru = {
    id: "ru",
    label: "Русский",
    normal: {
        keys: "ё1234567890-=\x00@йцукенгшщзхъ\\«\x00фывапролджэ!\x00\nячсмитьбю,.\x00"
    },
    shift: {
        keys: "Ё!@№$%^&*()_+\x00@ЙЦУКЕНГШЩЗХЪ/»\x00ФЫВАПРОЛДЖЭ?\x00\nЯЧСМИТЬБЮ;:\x00"
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£\x00\x00@~§¶:;\x00'\"«»[]{}\x00μ\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00",
        specialKeys: {
            13: {
                type: "rub",
                label: "ru"
            },
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        }
    },
    specialKeys: {
        14: {
            type: "backspace",
            label: "←"
        },
        15: {
            type: "atmark",
            label: "@"
        },
        30: {
            type: "capslock",
            label: "capslock"
        },
        43: {
            type: "enter",
            label: "enter"
        },
        44: {
            type: "lshift",
            label: "shift"
        },
        56: {
            type: "rshift",
            label: "shift"
        }
    }
},
Lego.block["b-keyboard"].lang.by = {
    id: "by",
    label: "Беларуская",
    normal: {
        keys: "ё1234567890-=\x00@йцукенгшўзх'\\«\x00фывапролджэ!\x00\nячсмітьбю,.\x00"
    },
    shift: {
        keys: "Ё!@№$%^&*()_+\x00@ЙЦУКЕНГШЎЗХ'/»\x00ФЫВАПРОЛДЖЭ?\x00\nЯЧСМІТЬБЮ;:\x00"
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£μ\x00@~§¶:;\x00'\"«»[]{}\x00\x00\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00"
    },
    specialKeys: {
        14: {
            type: "backspace",
            label: "←"
        },
        15: {
            type: "atmark",
            label: "@"
        },
        30: {
            type: "capslock",
            label: "capslock"
        },
        43: {
            type: "enter",
            label: "enter"
        },
        44: {
            type: "lshift",
            label: "shift"
        },
        56: {
            type: "rshift",
            label: "shift"
        }
    }
},
Lego.block["b-keyboard"].lang.kz = {
    id: "kz",
    label: "Қазақша",
    normal: {
        keys: "■1234567890-=\x00@йңукенгшғзхұ\\«\x00өықапролджә!\x00\nяісмитүбю,.\x00",
        specialKeys: {
            1: {
                type: "accent_mod",
                label: "■"
            },
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            mod: {
                17: {
                    type: "ц",
                    label: "ц"
                },
                20: {
                    type: "ё",
                    label: "ё"
                },
                24: {
                    type: "щ",
                    label: "щ"
                },
                26: {
                    type: "h",
                    label: "h"
                },
                27: {
                    type: "ъ",
                    label: "ъ"
                },
                31: {
                    type: "ф",
                    label: "ф"
                },
                33: {
                    type: "в",
                    label: "в"
                },
                41: {
                    type: "э",
                    label: "э"
                },
                46: {
                    type: "ч",
                    label: "ч"
                },
                51: {
                    type: "ь",
                    label: "ь"
                }
            }
        }
    },
    shift: {
        keys: "■!@№$%^&*()_+\x00@ЙҢУКЕНГШҒЗХҰ/»\x00ӨЫҚАПРОЛДЖӘ?\x00\nЯІСМИТҮБЮ;:\x00",
        specialKeys: {
            1: {
                type: "accent_mod",
                label: "■"
            },
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            mod: {
                17: {
                    type: "Ц",
                    label: "Ц"
                },
                20: {
                    type: "Ё",
                    label: "Ё"
                },
                24: {
                    type: "Щ",
                    label: "Щ"
                },
                26: {
                    type: "H",
                    label: "H"
                },
                27: {
                    type: "Ъ",
                    label: "Ъ"
                },
                31: {
                    type: "Ф",
                    label: "Ф"
                },
                33: {
                    type: "В",
                    label: "В"
                },
                41: {
                    type: "Э",
                    label: "Э"
                },
                46: {
                    type: "Ч",
                    label: "Ч"
                },
                51: {
                    type: "Ь",
                    label: "Ь"
                }
            }
        }
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£μ\x00@~§¶:;\x00'\"«»[]{}\x00\x00\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        }
    }
},
Lego.block["b-keyboard"].lang.tt = {
    id: "tt",
    label: "Татарча",
    normal: {
        keys: "һ1234567890-=\x00@йөукенгшәзхүъ!\x00фывапролдңэ■\x00\nячсмитҗбю,.\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            42: {
                type: "accent_mod",
                label: "■"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            mod: {
                1: {
                    type: "ё",
                    label: "ё"
                },
                4: {
                    type: "#",
                    label: "#"
                },
                8: {
                    type: "[",
                    label: "["
                },
                9: {
                    type: "]",
                    label: "]"
                },
                10: {
                    type: "{",
                    label: "{"
                },
                11: {
                    type: "}",
                    label: "}"
                },
                17: {
                    type: "ц",
                    label: "ц"
                },
                24: {
                    type: "щ",
                    label: "щ"
                },
                27: {
                    type: "ъ",
                    label: "ъ"
                },
                40: {
                    type: "ж",
                    label: "ж"
                },
                41: {
                    type: "`",
                    label: "`"
                },
                51: {
                    type: "ь",
                    label: "ь"
                },
                52: {
                    type: "<",
                    label: "<"
                },
                53: {
                    type: ">",
                    label: ">"
                }
            }
        }
    },
    shift: {
        keys: "Һ!@№$%^&*()_+\x00@ЙӨУКЕНГШӘЗХҮЪ!\x00ФЫВАПРОЛДҢЭ\x00\x00\nЯЧСМИТҖБЮ;:\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            42: {
                type: "accent_mod",
                label: "■"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            mod: {
                1: {
                    type: "Ё",
                    label: "Ё"
                },
                4: {
                    type: "#",
                    label: "#"
                },
                8: {
                    type: "[",
                    label: "["
                },
                9: {
                    type: "]",
                    label: "]"
                },
                10: {
                    type: "{",
                    label: "{"
                },
                11: {
                    type: "}",
                    label: "}"
                },
                17: {
                    type: "Ц",
                    label: "Ц"
                },
                24: {
                    type: "Щ",
                    label: "Щ"
                },
                27: {
                    type: "Ъ",
                    label: "Ъ"
                },
                40: {
                    type: "Ж",
                    label: "Ж"
                },
                41: {
                    type: "`",
                    label: "`"
                },
                51: {
                    type: "Ь",
                    label: "Ь"
                },
                52: {
                    type: "<",
                    label: "<"
                },
                53: {
                    type: ">",
                    label: ">"
                }
            }
        }
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£μ\x00@~§¶:;\x00'\"«»[]{}\x00\x00\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        }
    }
},
Lego.block["b-keyboard"].lang.tr = {
    id: "tr",
    label: "Türkçe",
    normal: {
        keys: "`1234567890-=\x00@qwertyuıopğü⌃\\\x00asdfghjklşi!\x00\nzxcvbnmöç,.\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            28: {
                type: "accent_mod",
                label: "^"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            mod: {
                15: {
                    type: "@",
                    label: "@"
                },
                22: {
                    type: "u",
                    label: "û"
                },
                24: {
                    type: "o",
                    label: "ô"
                },
                31: {
                    type: "a",
                    label: "â"
                },
                41: {
                    type: "i",
                    label: "î"
                }
            }
        }
    },
    shift: {
        keys: "~!@#$%^&*()_+\x00@QWERTYUIOPĞÜ⌃\\\x00ASDFGHJKLŞİ?\x00\nZXCVBNMÖÇ;:\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            28: {
                type: "accent_mod",
                label: "^"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            mod: {
                15: {
                    type: "@",
                    label: "@"
                },
                22: {
                    type: "U",
                    label: "Û"
                },
                24: {
                    type: "O",
                    label: "Ô"
                },
                31: {
                    type: "A",
                    label: "Â"
                },
                41: {
                    type: "I",
                    label: "Î"
                }
            }
        }
    },
    alt: {
        keys: "°±¼½¾¤¬²³¢€£μ\x00@~§¶:;\x00'\"«»[]{}\x00\x00\x00\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00"
    },
    specialKeys: {
        14: {
            type: "backspace",
            label: "←"
        },
        15: {
            type: "atmark",
            label: "@"
        },
        30: {
            type: "capslock",
            label: "capslock"
        },
        43: {
            type: "enter",
            label: "enter"
        },
        44: {
            type: "lshift",
            label: "shift"
        },
        56: {
            type: "rshift",
            label: "shift"
        }
    }
},
Lego.block["b-keyboard"].lang.id = {
    id: "id",
    label: "Indonesian",
    normal: {
        keys: "`1234567890-=\x00@qwertyuiop[]\\“\x00asdfghjkl;'!\x00\nzxcvbnm,.:/\x00",
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            29: {
                type: "accent_mod",
                label: "■"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            mod: {
                16: {
                    type: "a",
                    label: "ä"
                },
                17: {
                    type: "a",
                    label: "å"
                },
                18: {
                    type: "e",
                    label: "é"
                },
                19: {
                    type: "r",
                    label: "®"
                },
                20: {
                    type: "t",
                    label: "þ"
                },
                21: {
                    type: "u",
                    label: "ü"
                },
                22: {
                    type: "u",
                    label: "ú"
                },
                23: {
                    type: "i",
                    label: "í"
                },
                24: {
                    type: "o",
                    label: "ó"
                },
                25: {
                    type: "o",
                    label: "ö"
                },
                31: {
                    type: "a",
                    label: "á"
                },
                32: {
                    type: "s",
                    label: "ß"
                },
                33: {
                    type: "d",
                    label: "ð"
                },
                39: {
                    type: "o",
                    label: "ø"
                },
                41: {
                    type: "accentmark",
                    label: "´"
                },
                42: {
                    type: "!",
                    label: "¡"
                },
                45: {
                    type: "ae",
                    label: "æ"
                },
                47: {
                    type: "c",
                    label: "©"
                },
                50: {
                    type: "n",
                    label: "ñ"
                },
                51: {
                    type: "u",
                    label: "µ"
                },
                52: {
                    type: "c",
                    label: "ç"
                },
                54: {
                    type: "questionmark",
                    label: "¿"
                }
            }
        }
    },
    shift: {
        keys: '~!@#$%^&*()_+\x00@QWERTYUIOP{}|”\x00ASDFGHJKL:"?\x00\nZXCVBNM<>;—\x00',
        specialKeys: {
            14: {
                type: "backspace",
                label: "←"
            },
            15: {
                type: "atmark",
                label: "@"
            },
            30: {
                type: "capslock",
                label: "capslock"
            },
            29: {
                type: "accent_mod",
                label: "■"
            },
            43: {
                type: "enter",
                label: "enter"
            },
            44: {
                type: "lshift",
                label: "shift"
            },
            56: {
                type: "rshift",
                label: "shift"
            }
        },
        accents: {
            mod: {
                16: {
                    type: "a",
                    label: "Ä"
                },
                17: {
                    type: "a",
                    label: "Å"
                },
                18: {
                    type: "e",
                    label: "É"
                },
                19: {
                    type: "r",
                    label: "®"
                },
                20: {
                    type: "t",
                    label: "Þ"
                },
                21: {
                    type: "u",
                    label: "Ü"
                },
                22: {
                    type: "u",
                    label: "Ú"
                },
                23: {
                    type: "i",
                    label: "Í"
                },
                24: {
                    type: "o",
                    label: "Ó"
                },
                25: {
                    type: "o",
                    label: "Ö"
                },
                31: {
                    type: "a",
                    label: "Á"
                },
                32: {
                    type: "s",
                    label: "§"
                },
                33: {
                    type: "d",
                    label: "Ð"
                },
                39: {
                    type: "o",
                    label: "Ø"
                },
                41: {
                    type: "accentmark",
                    label: "¨"
                },
                42: {
                    type: "!",
                    label: "¡"
                },
                45: {
                    type: "ae",
                    label: "Æ"
                },
                47: {
                    type: "c",
                    label: "¢"
                },
                50: {
                    type: "n",
                    label: "Ñ"
                },
                51: {
                    type: "u",
                    label: "µ"
                },
                52: {
                    type: "c",
                    label: "Ç"
                },
                54: {
                    type: "questionmark",
                    label: "¿"
                }
            }
        }
    },
    alt: {
        keys: "°±¼½¾¤¹²³¢€£¥\x00@~§¶:;¬'\"«»[]{}\x00×÷\x00\x00‘’„“”\x00!?\x00\n\x00\x00\x00\x00<>–—\\|/\x00"
    },
    specialKeys: {
        14: {
            type: "backspace",
            label: "←"
        },
        15: {
            type: "atmark",
            label: "@"
        },
        30: {
            type: "capslock",
            label: "capslock"
        },
        43: {
            type: "enter",
            label: "enter"
        },
        44: {
            type: "lshift",
            label: "shift"
        },
        56: {
            type: "rshift",
            label: "shift"
        }
    }
},
BEM.DOM.decl("b-keyboard-popup", {
    onSetMod: {
        js: function() {
            Lego.block["b-keyboard-popup"].call(this.domElem, this.params)
        }
    }
}),
function(e, t) {
    t.block["b-keyboard-popup"] = function(a) {
        var l = e('<div class="b-keyboard-popup__gap"/><div class="b-keyboard-popup"><span class="b-keyboard-popup__close" title="' + BEM.I18N("b-keyboard-popup", "close") + '"></span><div class="b-keyboard i-bem" data-bem="{&quot;b-keyboard&quot;:{&quot;fake&quot;:false,&quot;lang&quot;:&quot;' + a.lang + "&quot;" + (a["for"] ? ",&quot;for&quot;: &quot;" + a["for"] + "&quot;" : "") + '}}"/></div>').appendTo("body")
          , s = l.filter(".b-keyboard-popup")
          , p = function(e) {
            return "undefined" == typeof e ? s.data("isHidden") : void s.data("isHidden", e)
        }
          , c = function() {
            p() || (l.addClass("i-hidden"),
            e(window).trigger("keyboardClosed.lego"),
            p(!0))
        }
        ;
        e(document).bind("popupsClose.lego", function(t, a) {
            p() || a && a.source && e.contains(s[0], a.source) || c()
        }),
        l.find(".b-keyboard-popup__close").click(function() {
            c();
            var e = t.block["b-keyboard"]._lastFocusedIn;
            e && e.focus()
        })
    }
}(jQuery, window.Lego);
