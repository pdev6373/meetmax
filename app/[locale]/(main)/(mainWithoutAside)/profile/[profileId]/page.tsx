import { Profile as ProfileComponent } from "@/components";
import { useTranslations } from "next-intl";
export default function Profile(param: any) {
  const t = useTranslations("Index");

  return (
    <ProfileComponent
      id={param.params.profileId}
      born={t("born")}
      chooseAnImage={t("chooseAnImage")}
      editBasicInfo={t("editBasicInfo")}
      editCoverPhoto={t("editCoverPhoto")}
      editDetails={t("editDetails")}
      editPhoto={t("editPhoto")}
      female={t("female")}
      male={t("male")}
      facebook={t("facebook")}
      instagram={t("instagram")}
      linkedin={t("linkedin")}
      twitter={t("twitter")}
      follow={t("follow")}
      follower={t("follower")}
      followers={t("followers")}
      following={t("following")}
      intro={t("intro")}
      save={t("save")}
      unfollow={t("unfollow")}
      noPostYet={t("noPostYet")}
      noPostYetFollower={t("noPostAvailable")}
      createPost={t("createAPost")}
      imageSize={t("imageSize")}
      makePostTexts={{
        addPhoto: t("addPhoto"),
        createAPost: t("createAPost"),
        friends: t("friends"),
        onlyMe: t("onlyMe"),
        postText: t("post"),
        public: t("public"),
        visibleText: t("visibleFor"),
        whatsHappening: t("whatsHappening"),
        update: t("update"),
      }}
      postTexts={{
        cancel: t("cancel"),
        comment: t("comment"),
        comments: t("comments"),
        confirmDeletePost: t("confirmDelete"),
        confirmUnfollow: t("confirmUnfollow"),
        reply: t("reply"),
        public: t("public"),
        onlyMe: t("onlyMe"),
        you: t("you"),
        liked: t("liked"),
        friends: t("friends"),
        hideComment: t("hideComment"),
        hideComments: t("hideComments"),
        replyingTo: t("replyingTo"),
        showComment: t("showComment"),
        showComments: t("showComments"),
        deletePostQuestion: t("deletePostQuestion"),
        deletePostText: t("deletePost"),
        deleteText: t("delete"),
        hidePost: t("hidePost"),
        postHidden: t("postHidden"),
        postHiddenDetails: t("notVisibileInTimeline"),
        writeAComment: t("writeAComment"),
        unfollow: t("unfollow"),
        noComments: t("noComments"),
        like: t("like"),
        follow: t("follow"),
        error: t("anErrorOccurred"),
        editPost: t("editPost"),
        unfollowSuccess: t("unfollowSuccess"),
        followSuccess: t("followSuccess"),
        postDeleteSuccess: t("postDeleteSuccess"),
        commentSuccess: t("commentSuccess"),
        confirmUnfollowMale: t("confirmUnfollowMale"),
      }}
    />
  );
}
